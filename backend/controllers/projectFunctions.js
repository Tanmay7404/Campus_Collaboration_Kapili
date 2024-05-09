const Project = require("../models/projectModel.js"); // Assuming the correct path to your projectModel file
const getObjectId = require("../functions/getObjectId.js");
const User = require("../models/userModel.js");
const ChatController = require("./chatFunctions.js");
const Chat = require("../models/chatModel.js");
const {createRoom} = require("../functions/Chats_Socket/socket.js");
const Tag = require("../models/tagModels.js");


class ProjectController {
    async addProject(project_details) {
        try {
            if(project_details.id==""){
                console.log("HELLO");
                const chat = new Chat({
                    participants: [], // Assuming participants is an array of user IDs
                    messages: [],
                    lastMessage: null,
                    lastMessageTime: Date.now(),
                    projectName: null,
                    courseName: null
                });   
                await chat.save();
                var new_proj = {...project_details,
                    endorsements: 0,
                    feedbacks: [],
                    rating: 0,
                    likedUsers:[],
                    chat: chat._id,
                    completedAt: Date.now(),
                    creators:[]
                }
                if(project_details.ongoing){
                    new_proj.completedAt = null;
                }
                console.log("new_proj",new_proj);
                var project = new Project(new_proj); 
                await project.save();
                chat.projectName = project._id;
                await chat.save();
                return project._id;
            }
            else{
                console.log("WHAT");
                var project = Project.findById(project_details.id);
                if(!project){
                    throw new Error("Project Not Found");
                }
                if((project.ongoing)&&(!project_details.ongoing)){
                    project_details = {...project_details, completedAt: Date.now()};
                }
                else if(project_details.ongoing){
                    project_details = {...project_details, completedAt: null};
                }
                project = await Project.findByIdAndUpdate(project_details.id,project_details);
                return project._id;
            }
        } catch (err) {
            throw new Error(err);
        }
    }
    
    async addCreators(project_id, creatorsId) {
        try {
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            if(!creatorsId.length) {
                console.log("creators empty")
                return 0;
            }
            else if(creatorsId.length){
                console.log(1,project.creators);
                {project.creators.map(async (id) => {
                    var user = await User.findById(id);
                    console.log(user.username);
                    if (!user) {
                        throw new Error("User not found");
                    }

                    user.projects = user.projects.filter((e)=> e.toString()!==project_id.toString());
                    user.chats = user.chats.filter((e)=> e.toString()!==project.chat.toString());
                    console.log(user.projects);
                    await user.save();
                })}
                console.log(2);
                project.creators = creatorsId;

                var chat = await Chat.findById(project.chat);
                if (chat) {
                    chat.participants = project.creators;
                } else {
                    throw new Error ("Chat Not initialised");
                }
                {creatorsId.map(async (id) => {
                    var user = await User.findById(id);
                    if (!user) {
                        throw new Error("User not found");
                    }
                    user.projects.push(project_id);
                    user.chats.push(project.chat);
                    await user.save();
                })}
                await project.save();
                await chat.save();
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

    async addFeedback(projectName, userName , feedback) {
        try {
            let user = await User.findOne({username : userName });
            let project = await Project.findOne({name : projectName});
            if (!user || !project) {
                throw new Error("User or Project not found");
            }
            let data = {
                reviewer : userName,
                img:feedback.img,
                message : {
                    rating : feedback.rating,
                    text : feedback.text,
                }
            }
            project.feedbacks.push(data);
            var n = project.feedbacks.length;
            project.rating = (project.rating * (n - 1) + data.message.rating) / n;
            await project.save();
            return 1;
        } catch(err){
            throw new Error(err);
        }
    }
    async getTagInfoById(tagId) {
        try {
            const tag = await Tag.findById(tagId);
            if (!tag) {
                throw new Error("Tag not found");
            }
            return tag;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addNewCollaborators(projectName, userName ) {
        try {
            let user = await User.findOne({username : userName });
            let project = await Project.findOne({name : projectName});
            if (!user || !project) {
                throw new Error("User or Project not found");
            }
           
            project.creators.push(user);
        
            await project.save();
            return 1;
        } catch(err){
            throw new Error(err);
        }
    }

    // async addLikes(projectName, likes) {
    //     try {
    //         let project = await Project.findOne({name : projectName});
    //         if (!project) {
    //             throw new Error("User or Project not found");
    //         }
    //         project.endorsements=likes;
    //         await project.save();
    //         return 1;
    //     } catch(err){
    //         throw new Error(err);
    //     }
    // }


    async addLikedProject(username, projectname,likes) {
        try {
            const project = await Project.findOne({name:projectname });
            if (!project) return 0;
            project.likedUsers.push(username);
            project.endorsements=likes;

            await project.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }
    async removeLikedProject(username, projectname,likes) {
        // console.log('final')
        try {
            const project = await Project.findOne({name:projectname });
            if (!project) return 0;

            project.likedUsers = project.likedUsers.filter(users => users !== username);
            project.endorsements=likes;
            
            // console.log(project)
            await project.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
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
        try {
            if(!projectList){
                throw new Error("ProjectList is Empty");
            }
            projectList.sort((a,b)=>{
                const n3 = (a.rating)* (a.endorsements.length);
                const n4 = (b.rating)*(b.endorsements.length);
                if(n3===n4){
                    return 0;
                }
                return n3 < n4 ? -1 : 1;
            })
            return projectList;
        } catch (error) {
            throw new Error(error);
        }
    }
    sortProjectByTime(projectList){
        try {
            if(!projectList){
                throw new Error("Project list is empty");
            }
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
        } catch (error) {
            throw new Error(error);
        }
        
    }
    async sortProjectsByFriends(currUser,projectList){
        try{
            var user = await User.findOne({username: currUser});
            projectList.sort((a, b) => {
                const n1 = _.intersection(user.friends,a.creators).length;
                const n2 = _.intersection(user.friends,b.creators).length;
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
            return projectList;
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
    async addFeedbacks(project_name , feedback){
        const project = await Project.findOne({name : project_name});
        project.feedbacks.push(feedback);
        return 1;
    }

    async getProjectbyName (pname){
        try{
            const data = await Project.findOne({name:pname});
            var cc = await getObjectId.userIdtoNameList(data.creators);
            var tt = await getObjectId.tagIdtotaglist(data.tags);
            var dd = { ...data._doc, creators: cc, tags: tt };
            return dd;
        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = ProjectController;
