const Project = require("../models/projectModel.js"); // Assuming the correct path to your projectModel file
const getObjectId = require("../functions/getObjectId.js");
const User = require("../models/userModel.js");

class ProjectController {
    async addProject(project_details) {
        try {
            var project = new Project({
                title: project_details.title,
                projectInfo: {
                    description: project_details.description,
                    videoLink: project_details.videoLink,
                    photoLink: project_details.photoLink,
                    projectLink: project_details.projectLink
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
            return project_details._id;
        } catch (err) {
            throw new Error(err);
        }
    }



    async addCreators(project_id, creators) {
        try {
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            var creatorsId = await getObjectId.userNameToIdList(creators);
            project.creators = project.creators.concat(creatorsId);
            await project.save();
            return 1;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addEndorsements(project_id,endorsements){
        try{
            var project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            var endorsementsId = await getObjectId.userNameToIdList(endorsements);
            project.endorsements = project.endorsements.concat(endorsementsId);
            project.save();
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
            var tagsId = await getObjectId.tagNameToIdList(tags);
            project.tags = project.tags.concat(tagsId);
            project.save();
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
}

module.exports = ProjectController;
