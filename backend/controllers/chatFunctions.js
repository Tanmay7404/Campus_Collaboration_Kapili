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
                console.log(122222);
                chat = new Chat({
                    participants: [],
                    messages: []
                    
                });
                chat.save();
                //createRoom(chat._id,users);
            }
            console.log(1111);
            return chat._id;
        }catch(err){
            throw new Error(err);
        }
    }

    async joiningUserToChatId(chatId,currUserId){
        try{
            var chat = await Chat.findById(chatId);
            console.log(currUserId);
            console.log(chat.participants);
            if (chat.participants.some(participant => participant.toString() === currUserId.toString())) {
                console.log(10);
                return;
            }
            else{
                var user = await User.findById(currUserId);
                user.chats.push(chatId);
                chat.participants.push(currUserId);
                console.log(11);
                await chat.save();
                await user.save();
                return;
            }
        } catch(err){
            throw new Error(err);
        }
    }

    async getAllChatsOfUser(currUserId){
        try{
            var user = await User.findById(currUserId);
            if(user == null){
                throw new Error("User Not Found");
            }
            var chatIds = user.chats;
            var chats = [];
            chatIds.forEach((chatId)=>{
                var chat = Chat.findById(chatId);
                chats.push(chat);
            })
            return chats;
        }catch(err){
            throw new Error(err);
        }
    }

}

module.exports = ChatController;