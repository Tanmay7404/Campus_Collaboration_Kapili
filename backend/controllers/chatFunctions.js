const Chat = require("../models/chatModel.js"); // Assuming the correct path to your chatModel file

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

}

module.exports = ChatController;