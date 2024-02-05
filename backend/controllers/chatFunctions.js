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
 

}

module.exports = ChatController;