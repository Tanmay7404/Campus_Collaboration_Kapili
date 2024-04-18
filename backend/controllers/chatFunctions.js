const Chat = require("../models/chatModel.js"); // Assuming the correct path to your chatModel file
const User = require("../models/userModel.js");
const getObjectId = require("../functions/getObjectId.js");
const {createRoom} = require("../functions/Chats_Socket/socket.js");
const { ObjectId } = require('mongodb');


class ChatController {
        async addChat(chat_details) {
            try {
                const chat = new Chat({
                    participants: chat_details.participants, // Assuming participants is an array of user IDs
                    messages: chat_details.messages,
                    lastMessage: chat_details.lastMessage,
                    lastMessageTime: chat_details.lastMessageTime || Date.now(),
                    projectName: chat_details.projectName,
                    courseName:chat_details.courseName // Assuming projectName is a project ID
                });
                
                await chat.save();
                return chat._id;
            } catch (err) {
                console.error(err);
                return 0;
            }
        }

  async addMessage(chatId, messageDetails) {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                console.error("Chat not found");
                return 0;
            }
            const senderId= new ObjectId (messageDetails.sender)
            chat.messages.push({
                senderName:messageDetails.senderName,
                message: messageDetails.message,
                timestamp: Date.now(),
                img:messageDetails.img,
                messageType:messageDetails.messageType
            });

            chat.lastMessage = messageDetails.message;
            chat.lastMessageTime = Date.now();

            await chat.save();
            return chat.messages[chat.messages.length - 1]._id;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
    async deleteMessage(chatId, messageId) {
        try {
            // Find the chat by its ID
            const chat = await Chat.findById(chatId);
            if (!chat) {
                console.error("Chat not found");
                return 0;
            }
            // Find the index of the message in the messages array
            console.log(chat.messages[0]._id.toString())
            const messageIndex = chat.messages.findIndex(message =>   message._id.toString() === messageId );
            
            if (messageIndex === -1) {
                console.error("Message not found");
                return 0;
            }
    
            // Remove the message from the messages array
            chat.messages.splice(messageIndex, 1);
    
            // Update lastMessage and lastMessageTime if needed
            if (chat.messages.length > 0) {
                chat.lastMessage = chat.messages[chat.messages.length - 1].message;
                chat.lastMessageTime = chat.messages[chat.messages.length - 1].timestamp;
            } else {
                // If there are no more messages, reset lastMessage and lastMessageTime
                chat.lastMessage = null;
                chat.lastMessageTime = null;
            }
            console.log("deleted successully")
            // Save the updated chat
            await chat.save();
            return 1;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
    
    async findChatFromUsers(users){
        try{
            var userIds =await getObjectId.userNameToIdList(users);
       //    var newUserIds = userIds.map(user => user._id);

            var chat = await Chat.findOne({ participants: { $all: userIds, $size: userIds.length } });
            if(chat==null){
                chat = new Chat({
                    participants: [],
                    messages: []
                    
                });
                chat.save();
                //createRoom(chat._id,users);
            }
            return chat._id;
        }catch(err){
            throw new Error(err);
        }
    }
    async chatIdToUsers(chatId,users)
    {
        try{
            for (const userId of users) {
                // Add the chatId to the user's chatId list
                var user=await User.findById(userId)
                user.chats.push(chatId);
    
                // Save the updated user document
                await user.save();
            }
    } catch(err){
        throw new Error(err);
    }
    }
    async joiningUserToChatId(chatId,currUserId){
        try{
            var chat = await Chat.findById(chatId);
         
            if (chat.participants.some(participant => participant.toString() === currUserId.toString())) {
                return;
            }
            else{
                var user = await User.findById(currUserId);
                user.chats.push(chatId);
                chat.participants.push(currUserId);
                console.log(user.chats)
                await chat.save();
                await user.save();
                return;
            }
        } catch(err){
            console.log(err)
            throw new Error(err);
        }
    }
        async getMessagesByChatId(chatId) {
            try {
            const chat = await Chat.findById(chatId);
            //const chat=chats.populate('messages.sender', 'username')
            if (!chat) {
            console.log(`Chat with ID ${chatId} not found`);
            return [];
        }
            return chat ? chat.messages : [];
            } catch (error) {
            console.error("Error getting messages by chat ID:", error);
            throw error; // Rethrow to handle it outside
            }
          }
    async getChatParticipants(chatIds,currentUserId){
        try {
            var chatList = [];
            for (const chatId of chatIds) {
                
                const chat = await Chat.findById(chatId);
                if (chat) {
                    // Filter out the current user from the participants list
                    if(chat.projectName==null&&chat.courseName==null){
                    const participantsExcludingCurrentUser = chat.participants.filter(participant => !participant.equals(currentUserId));
                    chatList.push({chatId:chatId,participants:participantsExcludingCurrentUser,type:'User',lastMessageTime:chat.lastMessageTime});
                }
                    else if(chat.projectName!=null)
                    {
                        chatList.push({chatId:chatId,participants:chat.projectName,type:'Project',lastMessageTime:chat.lastMessageTime})
                    }else {
                        chatList.push({chatId:chatId,participants:chat.courseName,type:'Course',lastMessageTime:chat.lastMessageTime})

                    }
                } else {
                    console.log(`Chat with ID ${chatId} not found`);
                }
            }
            return chatList
          } catch (error) {
            console.error("Error getting messages by chat ID:", error);
            throw error; // Rethrow to handle it outside
            return []
        }
      }
    async getGlobalChatParticipants(chatId,currentUserId){
        try {
            var chatList = [];
           
                
                const chat = await Chat.findById(chatId);
                if (chat) {
                    // Filter out the current user from the participants list
                    if(chat.projectName==null&&chat.courseName==null){
                    const participantsExcludingCurrentUser = chat.participants.filter(participant => !participant.equals(currentUserId));
                    chatList.push({participants:participantsExcludingCurrentUser,type:'User',lastMessageTime:chat.lastMessageTime});
                }
                    else if(chat.projectName!=null)
                    {
                        chatList.push({chatId:chatId,participants:chat.projectName,type:'Project',lastMessageTime:chat.lastMessageTime})
                    }else {
                        chatList.push({chatId:chatId,participants:chat.courseName,type:'Course',lastMessageTime:chat.lastMessageTime})

                    }
                } else {
                    console.log(`Chat with ID ${chatId} not found`);
                }
            
            return chatList
          } catch (error) {
            console.error("Error getting messages by chat ID:", error);
            throw error; // Rethrow to handle it outside
            return []
        }
      }
    async getAllChatsOfUser(currUserId){
        try{
            var user = await User.findOne({ username:currUserId });
            if(user == null){
                throw new Error("User Not Found");
            }
           

            var chatIds = user.chats;
            var chats = [];
            chatIds.forEach((chatId)=>{
                var chat = Chat.findById(chatId);
                chats.push(chat);
            })
          
            chats.sort((a,b)=>{
                const n3 = a.lastMessageTimet;
                const n4 = b.lastMessage;
                if(n3===n4){
                    return 0;
                }
                return n3 < n4 ? -1 : 1;
            })
           
            var data =[];
            chats.forEach((chat)=>{
                // var d1={};
                chats.participants.forEach((userId)=>{
                    var user = User.findById(userId);
                    d1[profilePic]=user.profilePic;
                    // d1[userNaem]=
                });
                data.push(d1);
            })

            //return chats;
            return 1
        }catch(err){
            throw new Error(err);
        }
    }

}

module.exports = ChatController;