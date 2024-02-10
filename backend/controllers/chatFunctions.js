const Chat = require("../models/chatModel.js"); // Assuming the correct path to your chatModel file
const User = require("../models/userModel.js");
const getObjectId = require("../functions/getObjectId.js");
const {createRoom} = require("../functions/Chats_Socket/socket.js");


class ChatController {
    async addChat(chat_details) {
        try {
            const chat = new Chat({
                participants: chat_details.participants, // Assuming participants is an array of user IDs
                messages: chat_details.messages,
                lastMessage: chat_details.lastMessage,
                lastMessageTime: chat_details.lastMessageTime || Date.now(),
                projectName: chat_details.projectName // Assuming projectName is a project ID
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
            chat.messages.push({
                sender: messageDetails.sender,
                message: messageDetails.message,
                timestamp: Date.now()
            });

            chat.lastMessage = messageDetails.message;
            chat.lastMessageTime = Date.now();

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
                await chat.save();
                await user.save();
                return;
            }
        } catch(err){
            throw new Error(err);
        }
    }
    async getMessagesByChatId(chatId) {
        try {
          const chat = await Chat.findById(chatId).populate('messages.sender', 'username');
          return chat ? chat.messages : [];
        } catch (error) {
          console.error("Error getting messages by chat ID:", error);
          throw error; // Rethrow to handle it outside
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
            console.log(1232)
            console.log(chats)
            console.log(1232)
            
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