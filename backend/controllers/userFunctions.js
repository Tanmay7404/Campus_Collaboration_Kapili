const Project = require("../models/projectModel");
const Model = require("../models/userModel");
const Course = require("../models/courseModel");

class UserController {
    
    async addNewUser(user_details){
        try {
            const { username, fullname, email, bio, githubLink, instagramLink, linkedinLink,appleLink,facebookLink,url,imageName } = user_details;

            const user = new Model({
               username: username,
               fullname: fullname,
                email:email,
                friends: [],
                profileInfo: {
                  bio:  bio,
                    profilePicture: { url: url, filename: imageName }
                },
                githubLink: githubLink,
                  instagramLink:  instagramLink,
                  appleLink:appleLink,
                  facebookLink:facebookLink,
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
async checkUsersExistence(usernames)
{
    try{
        for(const user of usernames){
        const user2 = await Model.findOne({ username: user });

        if (!user2) {
            throw new Error("User not found");

        }
    }
    }catch (error) {
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
    async  userIdToNameAndProfileList(userIdList) {
        try {
            // Find users with matching IDs
            const users = await Model.find({ _id: { $in: userIdList } });
    
            // Check if all user IDs were found
            if (users.length === userIdList.length) {
                // Map user objects to their usernames
                const userInfoList = users.map(user => ({
                    username: user.username,
           
                   profilePic: user.profileInfo.profilePicture.url
                }));
                return userInfoList;
            } else {
                throw new Error("Some Users Not Found");
            }
        } catch (error) {
            // Handle errors, such as database errors or invalid input
            console.error(error);
            throw new Error("Internal Server Error");
        }
    }
    
    async addSkills(userName, skills) {
        try {
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
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getUserIdByUsername(username) {
        try {
            const user = await Model.findOne({ username:username });
            return user._id;
        } catch (error) {
            throw new Error(error);
        }
    }
    async  getUsernameProfile(userIds) {
        try {
            const profiles = [];
            for (const userIdT of userIds) {
                if(userIdT.type==='User'){
             for(const userId of userIdT.participants){
                const user = await Model.findById(userId);
                if (user) {
                    const profile = {
                        name: user.username,
                        profilePic: user.profileInfo.profilePicture.url,
                        messages:[],
                        chatId:userIdT.chatId,
                        lastMessageTime:userIdT.lastMessageTime
                    };
                    profiles.push(profile);
                } else {
                    console.log(`User with ID ${userId} not found`);
                }}
            }
            else if(userIdT.type==='Project')
            {
               const project=await Project.findById(userIdT.participants)
               if (project) {
                const profile = {
                    name: project.name,
                    profilePic: project.projectImage,
                    messages:[],
                    chatId:userIdT.chatId,
                    lastMessageTime:userIdT.lastMessageTime

                };
                profiles.push(profile);
            } else {
                console.log(`Project not found`);
            }
            }else 
            {
                const course=await Course.findById(userIdT.participants)
                if (course) {
                 const profile = {
                     name: course.name,
                     profilePic: course.projectImage,
                     messages:[],
                     chatId:userIdT.chatId,
                     lastMessageTime:userIdT.lastMessageTime

                 };
                 profiles.push(profile);
             } else {
                 console.log(`Course not found`);
             }
            }
        
        }
            return profiles;
        } catch (error) {
            throw new Error(error);
        }
    }
    

    async getUserChatList(username) {
        try {
            const user = await Model.findOne({ username:username });
            return user.chats;
        } catch (error) {
            throw new Error(error);
        }
    }
    
    async getUserFriends(username) {
        try {
            const user = await Model.findOne({ username: username }).populate('friends');
            const userFriends = user.friends;
            const data = {
                FRIENDS: []
            };
            for (let userFriend of userFriends) {
                const friendData = {
                    username: userFriend.username,
                    id : userFriend._id ,
                    profilePicture: userFriend.profileInfo.profilePicture.url, 
                };
                data.FRIENDS.push(friendData);
            }
            return data; 
        } catch (error) {
            console.error("Error fetching user friends:", error);
            throw error; 
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