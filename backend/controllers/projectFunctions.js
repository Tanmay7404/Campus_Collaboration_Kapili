const Project = require("../models/projectModel.js"); // Assuming the correct path to your projectModel file
const getObjectId = require("../functions/getObjectId.js");

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
            console.error(err);
            return 0;
        }
    }

    async addCreators(project_id,creators){
        var project = await Project.findById(project_id);
        var creatorsId = await getObjectId.userNameToIdList(creators);
        project.creators = project.creators.concat(creatorsId);
    }

    async addEndorsements(project_id,endorsements){
        var project = await Project.findById(project_id);
        var endorsementsId = await getObjectId.userNameToIdList(endorsements);
        project.endorsements = project.endorsements.concat(endorsementsId);
    }
    async addTags(project_id,tags){
        var project = await Project.findById(project_id);
        var tagsId = await getObjectId.tagNameToIdList(tags);
        project.tags = project.tags.concat(tagsId);
    }

    async addFeedback(project_id,feedback){
        var userId = await getObjectId.userNameToId(feedback.reviewer);
        if(userId == -1){
            return -1;
        }
        else{
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
        }
    }
    async changeCompleted(project_id,ongoingStatus){
        Project.findByIdAndUpdate(project_id,{ongoing: ongoingStatus}, (err)=>{
            if(err){
                return -1;
            }
            return 1;
        })
    }
    
        
}

module.exports = ProjectController;
