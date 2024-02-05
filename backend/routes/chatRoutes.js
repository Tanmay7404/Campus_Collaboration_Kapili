const express = require("express");
const chatRouter = express.Router();

// Import Controllers
const ChatController = require("../controllers/chatFunctions.js");
// Api Routes Declare

chatRouter.post("/addChat", async (req, res) => {
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


module.exports = chatRouter;
