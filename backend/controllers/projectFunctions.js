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

    async addCreators(project_id,creators){
        try{
            var project = await Project.findById(project_id);
            var creatorsId = await getObjectId.userNameToIdList(creators);
            project.creators = project.creators.concat(creatorsId);
            project.save();
        } catch(err){
            throw new Error(err);
        }
    }

    async addEndorsements(project_id,endorsements){
        try{
            var project = await Project.findById(project_id);
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
            var tagsId = await getObjectId.tagNameToIdList(tags);
            project.tags = project.tags.concat(tagsId);
            project.save();
        } catch(err){
            throw new Error(err);
        }
    }

    async addFeedback(project_id,feedback){
        try{
            var userId = await getObjectId.userNameToId(feedback.reviewer);
            var newFeedback = {
                reviewer: userId,
                message: {
                    rating: feedback.rating,
                    text: feedback.test,
                    timestamp: feedback.timestamp
                }
            }  
            var project = Project.findById(project_id);
            project.feedbacks.push(newFeedback);
            var n = project.feedbacks.length;
            project.rating = (project.rating*(n-1) +1)/n;
            project.save();
            return 1;
        } catch(err){
            throw new Error(err);
        }

        
    }
    async changeCompleted(project_id,ongoingStatus){
        Project.findByIdAndUpdate(project_id,{ongoing: ongoingStatus}, (err)=>{
            if(err){
                throw new Error(err);
            }
            return 1;
        })
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
            const n3 = (a.createdAt);
            const n4 = (b.createdAt);
            if(n3===n4){
                return 0;
            }
            return n3 < n4 ? -1 : 1;
        })
        return projectList;
    }
}

module.exports = ProjectController;
