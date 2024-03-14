const express = require("express");
const chatRouter = express.Router();

// Import Controllers
const ChatController = require("../controllers/chatFunctions.js");
const ProjectController = require("../controllers/projectFunctions.js");
// Api Routes Declare
const getObjectId = require("../functions/getObjectId.js");


chatRouter.post("/addNewChat", async (req, res) => {
    try {
        var chat_details = req.body;
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
        console.log(messageDetails)
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

chatRouter.post("/collaborateProject", async(req,res)=>{
    var projectId = req.body.projectId;
    var currUserName = req.body.currUserId;

    var CC = new ChatController()
    var chatId = await new ProjectController().chatIdFromProjectId(projectId);
    var x = await new ChatController().addMessage(newChat._id,{sender: currUserName, message: ("I Want To Collaborate!!")});

    //SEE WHAT TO RETURN
    // var chats = CC.getAllChatsOfUser(currUserId);
    res.send(1);
})

chatRouter.post("/getInTouch", async(req,res)=>{
    var userId = req.body.projectId;
    var currUserId = req.body.currUserId;
    //Add User to project;
    var CC = new ChatController()
    var chatId = await CC.findChatFromUsers([userId,currUserId]);
    await CC.joiningUserToChatId(chatId,currUserId);

    //SEE WHAT TO RETURN
    var chats = CC.getAllChatsOfUser(currUserId);
    res.send(chats); 
})

chatRouter.post("/personalChat", async (req, res) => {
    try {
        var friendUsername = req.body.friendId;
        var currUsername = req.body.currUserId;
        // Instantiate ChatController
        var CC = new ChatController();
       
        // Find chat between users
        var chatId = await CC.findChatFromUsers([friendUsername, currUsername]);
        var userId= await getObjectId.userNameToId(currUsername)
        var friendId= await getObjectId.userNameToId(friendUsername)

        // Join users to chat
        await CC.joiningUserToChatId(chatId,userId);
        await CC.joiningUserToChatId(chatId,friendId);

        // Get all chats of current user
      //  var chats = await CC.getAllChatsOfUser();

        // Send response with chats
        res.send(chatId);
    } catch (error) {
        console.error('Error in /personalChat:', error);
        res.status(500).send({ error: 'Internal server error' }); // Send a generic error response
    }
});

chatRouter.get("/getAllMessages/:chatId", async (req, res) => {
    try {
      const chatId = req.params.chatId;
      var CC = new ChatController();
  
      const chats = await CC.getMessagesByChatId(chatId);
      //console.log("chats "+ chats)
      res.json(chats);
    } catch (error) {
      console.error('Error in /getAllMessages', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

  chatRouter.get("/getTotalChats/:chatId", async (req, res) => {
    try {
      const chatId = req.params.chatId;
      var CC = new ChatController();
     console.log(chatId)
      const chats = await CC.getAllChatsOfUser(chatId);
      

      res.json(chats);
    } catch (error) {
      console.error('Error in /getAllMessages', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  });

module.exports = chatRouter;
