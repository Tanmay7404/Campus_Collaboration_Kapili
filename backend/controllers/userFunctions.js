const Model = require("../models/userModel");

class UserController {
    
    async addNewUser(user_details){
        try {
            const { username, fullname, email, bio, githubLink, instagramLink, linkedinLink } = user_details;

            const user = new Model({
               username: username,
               fullname: fullname,
                email:email,
                friends: [],
                profileInfo: {
                    bio,
                    profilePicture: { url: "", filename: "" }
                },
                githubLink: githubLink,
                  instagramLink:  instagramLink,
                   linkedinLink: linkedinLink,
                department: user_details.department,
                skills: [],
                projects: [],
                coursesCompleted: [],
                chats: []
            });

            await user.save();
            return user.username;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addFriend(userName, friendUserName) {
        try {
            // Step 1: Find the user by their username to get their user ID
            const friend = await Model.findOne({ username: friendUserName });
    
            if (!friend) {
                console.log("Friend not found");
                return 0; // Return 0 if the friend is not found
            }
    
            // Step 2: Add the user ID to the friend list of the current user
            const currentUser = await Model.findOne({ username: userName });
    
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
            throw new Error(error);
        }
    }

    async addSkills(userName, skills) {
        try {
            console.log(userName)
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: userName });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Add the skills to the user's skills array
            user.skills = [...new Set([...user.skills, ...skills])]; // Ensure uniqueness of skills
            await user.save();

            console.log("Skills added successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeSkills(userName, skills) {
        try {
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: userName });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Remove the specified skills from the user's skills array
            user.skills = user.skills.filter(skill => !skills.includes(skill));
            await user.save();

            console.log("Skills removed successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateBio(username, newBio) {
        try {
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: username });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Update the bio in the user's profileInfo
            user.profileInfo.bio = newBio;
            await user.save();

            console.log("Bio updated successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProfilePicture(username, newProfilePicture) {
        try {
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: username });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Update the profile picture in the user's profileInfo
            user.profileInfo.profilePicture  = newProfilePicture;
            await user.save();

            console.log("Profile picture updated successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error); // Return 0 for any error
        }
    }
    async addChatToUser(username, chatId) {
        try {
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: username });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Add the chat ID to the user's chats array
            user.chats.push(chatId);
            await user.save();

            console.log("Chat added to user successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeChatFromUser(username, chatId) {
        try {
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: username });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Remove the chat ID from the user's chats array
            user.chats = user.chats.filter((existingChatId) => existingChatId.toString() !== chatId.toString());
            await user.save();

            console.log("Chat removed from user successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error);
        }
    }

    async addCompletedCourseToUser(username, courseId) {
        try {
            // Step 1: Find the user by their username
            const user = await Model.findOne({ username: username });

            if (!user) {
                console.log("User not found");
                return 0; // Return 0 if the user is not found
            }

            // Step 2: Add the course ID to the user's completed courses array
            user.coursesCompleted.push(courseId);
            await user.save();

            console.log("Completed course added to user successfully");
            return 1; // Return 1 for success
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUserByUsername(username) {
        try {
            const user = await Model.findOne({ username:username });
            console.log(user)
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addParticipants(chatId, participantIds) {
        try {
            const chat = await Chat.findById(chatId);
            if (!chat) {
                console.error("Chat not found");
                return 0;
            }

            chat.participants.push(...participantIds);

            await chat.save();
            return 1;
        } catch (err) {
            throw new Error(err);
        }
    }
    

}


module.exports = UserController;