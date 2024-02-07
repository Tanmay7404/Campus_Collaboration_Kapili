const express = require("express");
const chatRouter = express.Router();

// Import Controllers
const ChatController = require("../controllers/chatFunctions.js");
// Api Routes Declare

chatRouter.post("/addNewChat", async (req, res) => {
    try {
        var chat_details = req.body;
        console.log(chat_details);
        const data = await new ChatController().addChat(chat_details);

        if (data === 1) {
            res.send("Updated");
        } else {
            res.send("Can't add chat");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

chatRouter.post("/addMessage/:chatId", async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const messageDetails = req.body;
        
        const data = await new ChatController().addMessage(chatId, messageDetails);
        
        if (data === 1) {
            res.send("Message added successfully");
        } else {
            res.status(404).send("Chat not found or unable to add message");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


chatRouter.post("/addParticipants/:chatId", async (req, res) => {
    try {
        const chatId = req.params.chatId;
        const participantIds = req.body.participantIds; // Assuming participantIds is an array of user IDs

        const data = await new ChatController().addParticipants(chatId, participantIds);

        if (data === 1) {
            res.send("Participants added successfully");
        } else {
            res.status(404).send("Chat not found or unable to add participants");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
module.exports = chatRouter;
