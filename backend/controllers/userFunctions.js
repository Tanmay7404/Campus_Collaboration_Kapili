const Model = require("../models/userModel");

class UserController {
    
    async addNewUser(user_details){
        try {
            const user = new Model({
                username: user_details.username,
                fullname:user_details.fullname,
                email: user_details.email,
                friends: user_details.friends,
                profileInfo: {
                    bio: user_details.bio,
                    profilePicture: user_details.profilePictureLink
                },
                skills: user_details.skills,
                projects: [],
                coursesCompleted: [],
                chats: []
            });

            await user.save();
            return 1;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    async addFriend(currentUserEmail, friendEmail) {
        try {
            // Step 1: Find the user by their email to get their user ID
            const friend = await Model.findOne({ email: friendEmail });
    
            if (!friend) {
                console.log("Friend not found");
                return 0; // Return 0 if the friend is not found
            }
    
            // Step 2: Add the user ID to the friend list of the current user
            const currentUser = await Model.findOne({ email: currentUserEmail });
    
            if (!currentUser) {
                console.log("Current user not found");
                return 0; // Return 0 if the current user is not found
            }
    
            if (!currentUser.friends.includes(friend._id)) {
                currentUser.friends.push(friend._id);
                await currentUser.save();
                console.log("Friend added successfully");
                return 1; // Return 1 for success
            } else {
                console.log("Friend is already added");
                return 0; // Return 0 if the friend is already added
            }
        } catch (error) {
            console.error(error);
            return 0; // Return 0 for any error
        }
    }


    
}


module.exports = UserController;