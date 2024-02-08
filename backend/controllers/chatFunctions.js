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
            return 1;
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
            var userIds = getObjectId.userNameToIdList(users);
            var chat = await Chat.findOne({users: {$all: userIds,$size: userIds.length}});
            if(chat==null){
                chat = new Chat({
                    participants: userIds,
                    messages: []
                    
                });
                chat.save();
                createRoom(chat._id,users);
            }
            return chat._id;
        }catch(err){
            throw new Error(err);
        }
    }

    async joiningUserToChatId(chatId,currUserId){
        try{
            var chat = await Chat.findById(chatId);
            if(currUserId in chat.participants){
                return;
            }
            else{
                var user = await User.findById(currUserId);
                user.chats.push(chatId);
                chat.participants.push(currUserId);
                await chat.save();
                await user.save()
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