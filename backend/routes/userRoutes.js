const express = require("express");
const userRouter = express.Router();

require('dotenv').config();
const path = require("path");
const multer  = require('multer');
const {storage} = require("../functions/imageVideo/cloudconfig.js");
const upload = multer({ storage });

//Import Controllers
const UserController = require("../controllers/userFunctions.js");
//Api Routes Declare

userRouter.post("/addNewUser", upload.array("images",1), async (req,res)=>{
    try {
        var user_details = req.body;
        console.log(user_details);
        var UC = new UserController();
        const username = await UC.addNewUser(user_details);
       // var data = UC.updateProfilePicture(username,{url: req.files.path,filename: req.file.fieldname});    
        // if (data === 1) {
        //     res.send("Updated");
        // } else {
        //     res.send("Can't add user");
        // }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
userRouter.post("/addFriend", async (req, res) => {
    try {
        const { currentUserEmail, friendEmail } = req.body;

        const data = await new UserController().addFriend(currentUserEmail, friendEmail);

        if (data === 1) {
            res.send("Friend added successfully");
        } else if (data === 0) {
            res.send("Failed to add friend");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/addSkills", async (req, res) => {
    try {
        const { username, skills } = req.body;

        const data = await new UserController().addSkills(username, skills);

        if (data === 1) {
            res.send("Skills added successfully");
        } else if (data === 0) {
            res.send("Failed to add skills");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/removeSkills", async (req, res) => {
    try {
        const { username, skills } = req.body;

        const data = await new UserController().removeSkills(username, skills);

        if (data === 1) {
            res.send("Skills removed successfully");
        } else if (data === 0) {
            res.send("Failed to remove skills");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/updateBio", async (req, res) => {
    try {
        const { username, newBio } = req.body;

        const data = await new UserController().updateBio(username, newBio);

        if (data === 1) {
            res.send("Bio updated successfully");
        } else if (data === 0) {
            res.send("Failed to update bio");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/updateProfilePicture", async (req, res) => {
    try {
        const { username, newProfilePicture } = req.body;

        const data = await new UserController().updateProfilePicture(username, newProfilePicture);

        if (data === 1) {
            res.send("Profile picture updated successfully");
        } else if (data === 0) {
            res.send("Failed to update profile picture");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/addChatToUser", async (req, res) => {
    try {
        const { username, chatId } = req.body;

        const data = await new UserController().addChatToUser(username, chatId);

        if (data === 1) {
            res.send("Chat added to user successfully");
        } else if (data === 0) {
            res.send("Failed to add chat to user");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/removeChatFromUser", async (req, res) => {
    try {
        const { username, chatId } = req.body;

        const data = await new UserController().removeChatFromUser(username, chatId);

        if (data === 1) {
            res.send("Chat removed from user successfully");
        } else if (data === 0) {
            res.send("Failed to remove chat from user");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.post("/addCompletedCourse", async (req, res) => {
    try {
        const { username, courseId } = req.body;

        const userController = new UserController();
        const data = await userController.addCompletedCourseToUser(username, courseId);

        if (data === 1) {
            res.send("Completed course added to user successfully");
        } else if (data === 0) {
            res.send("Failed to add completed course");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

userRouter.get('/getUser/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await new UserController().getUserByUsername(username);

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
module.exports = userRouter;
