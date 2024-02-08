const Project = require("../models/projectModel.js"); // Assuming the correct path to your projectModel file
const getObjectId = require("../functions/getObjectId.js");
const User = require("../models/userModel.js");
const ChatController = require("./chatFunctions.js");
const Chat = require("../models/chatModel.js");
const {createRoom} = require("../functions/Chats_Socket/socket.js");


class ProjectController {
    async addProject(project_details) {
        try {
            var project = new Project({
                title: project_details.title,
                name : project_details.name,
                projectInfo: {
                    description: project_details.description,
                    imgVideoLinks: [],
                    projectLink: project_details.projectLinks
                },
                creators: [], // Assuming creators is an array of user IDs
                endorsements: [],
                tags: [], // Assuming tags is an array of strings
                ongoing: project_details.ongoing || false,
                feedbacks: [],
                rating: 0,
                issues: []
            });

            await project.save();
            project.chat = await addChat(project.name);
            return project._id;
        } catch (err) {
            throw new Error(err);
        }
    }

    async editProjects(projectId , project_details){
        try {
            const updatedProject = await Project.findByIdAndUpdate(projectId ,{
                title : project_details.title,
                name : project_details.name,
                projectInfo : {
                    description: project_details.description,
                    $push : {imageVideolinks : project_details.imageVideolinks},
                    projectLink: project_details.projectLinks
                },
                ongoing : project_details.ongoing,
                $push : {tags : project_details.tags}
            })
            return updatedProject;
        } catch (error) {
            throw new Error(error);
        }    
    }

    async addCreators(project_id, creators) {
        try {
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            if(!creators.length) {
                console.log("creators empty")
                return 0;
            }
            else if(creators.length){
                var creatorsId = await getObjectId.userNameToIdList(creators);
                project.creators = project.creators.concat(creatorsId);
                let chat = project.chat;
                let newChat = await Chat.findById(chat);
                newChat.participants.push(...creatorsId);
                await project.save();
                await newChat.save();
                return 1;
            }
            
        } catch (error) {
            throw error;
        }
    }

    async addEndorsements(project_id,endorsements){
        try{
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            if(!endorsements.length){
                console.log("endorsment empty")
                return ;
            }
            else if(endorsements.length){
                var endorsementsId = await getObjectId.userNameToIdList(endorsements);
                project.endorsements = project.endorsements.concat(endorsementsId);
                project.save();
                return 1;
            }        
        } catch(err){
            throw new Error(err);
        }
    }
    async addTags(project_id,tags){
        try{
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            if(!tags.length){
                console.log("tags are empty");
                return;
            }
            else if(tags.length){
                var tagsId = await getObjectId.tagNameToIdList(tags);
                project.tags = project.tags.concat(tagsId);
                project.save();
            }
        } catch(err){
            throw new Error(err);
        }
    }

    async addFeedback(project_id, feedback) {
        try {
            var userId = await getObjectId.userNameToId(feedback.reviewer);
            if (userId === -1) {
                throw new Error("User not found");
            }
            var newFeedback = {
                reviewer: userId,
                message: {
                    rating: feedback.rating,
                    text: feedback.text,
                    timestamp: feedback.timestamp
                }
            }  
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            project.feedbacks.push(newFeedback);
            var n = project.feedbacks.length;
            project.rating = (project.rating * (n - 1) + newFeedback.message.rating) / n;
            await project.save();
            return 1;
        } catch(err){
            throw new Error(err);
        }
    }

    async changeCompleted(project_id, ongoingStatus) {
        try {
            const result = await Project.findByIdAndUpdate(project_id, { ongoing: ongoingStatus });
            if (!result) {
                throw new Error("Project not found");
            }
            return 1;
        } catch (error) {
            throw new WebTransportError(err);
        }
    }

    async addDemolinks (project_id, files){
        let urls = [];
        let filenames = [];
        for (let file of files) {
            urls.push(file.path);
            filenames.push(file.fieldname);
        }
        var project = await Project.findById(project_id);
        if(project ==NULL){
            throw new Error("Project Not Found!!");
        }

        project.projectInfo.imageVideolinks = project.projectInfo.imageVideolinks.concat(urls.map((ur, index) => ({url: ur, filename: filenames[index] })));
    }
            
    async getUserProjects(currUserId){
        try{
            var user = User.findById(currUserId);
            var projectIDs = user.projects;
            var projects = [];
            projectIDs.forEach(id => {
                var project = Project.findById(id);
                projects.push(project);
            });
            return projects;
        } catch(err){
            throw new Error(err);
        }
    }
    async getOthersProjects(currUserId){
        try{
            var projects = Project.find({creators: {$ne: { $elemMatch: currUserId }}});
            return projects;
        } catch(err){
            throw new Error(err);
        }
    }

    async delProjects(project_id){
        try {
            const project = await Project.findByIdAndDelete(project_id);
            return project;
        } catch (error) {
            throw new Error(error);
        }
    }

    sortProjectByPopularity(projectList){
        projectList.sort((a,b)=>{
            const n3 = (a.rating)* (a.endorsements.length);
            const n4 = (b.rating)*(b.endorsements.length);
            if(n3===n4){
                return 0;
            }
            return n3 < n4 ? -1 : 1;
        })
        return projectList;
    }
    sortProjectByTime(projectList){
        projectList.sort((a,b)=>{
            if(a.ongoing){
                var n3 = (a.createdAt);
            }
            else{
                var n3 = a.completedAt
            }
            if(b.ongoing){
                var n4 = (b.createdAt);
            }
            else{
                var n4 = b.completedAt
            }
            if(n3===n4){
                return 0;
            }
            return n3 < n4 ? -1 : 1;
        })
        return projectList;
    }
    async sortProjectsByFriends(currUser,projectList){
        try{
            var user = await User.findOne({username: currUser});
            projectList.sort((a, b) => {
                const n1 = _.intersection(user.friends,a.creators).length;
                const n2 = _.intersection(user.friends,a.creators).length;
                if (n1 === n2) {
                    const n3 = _.intersection(user.skills,a.tags).length;
                    const n4 = _.intersection(user.skills,b.tags).length;
                    if(n3===n4){
                        return 0;
                    }
                    return n3 < n4 ? -1 : 1;
                }
                return n1 < n2 ? -1 : 1;
            });
        }catch(err){
            throw new Error(err);
        }
    }

    async addChat(projectname){
        try {
            const projectid = await getObjectId.projectNameToId(projectname);
            const project = await Project.findById(projectid);
            if(!project){
            throw new Error("Project not Found");
        }
        const projectUser = project.creators;
        var participants = projectUser.map(async (userId) =>{
            var user = User.findById(userId);
            return user.username;
        })
        const chat = new Chat({
            participants : projectUser,
            message : [],
            projectName : projectid,
        })
        await chat.save();

        createRoom(chat._id,participants);

        return chat._id;
        } catch (error) {
            throw new Error(error);
        }    
    }
    async chatIdFromProjectId(projectId){
        try {
            const project = await Project.findById(projectId);
            if(!project){
            throw new Error("Project Not found");
            }
            const projectChat = project.chat;
            return projectChat;
        } catch (error) {
            throw new Error(error);
        }    
    }
}

module.exports = ProjectController;
