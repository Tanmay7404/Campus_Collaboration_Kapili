const express = require("express");
const userRouter = express.Router();

//Import Controllers
const UserController = require("../controllers/userFunctions.js");
//Api Routes Declare

userRouter.post("/addNewUser", async (req,res)=>{
    try {
        var user_details = req.body;
        console.log(user_details);
        const data = await new UserController().addNewUser(user_details);

        if (data === 1) {
            res.send("Updated");
        } else {
            res.send("Can't add user");
        }
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
module.exports = userRouter;