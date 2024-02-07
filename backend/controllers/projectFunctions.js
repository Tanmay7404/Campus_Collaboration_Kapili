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

    async addCreators(project_id, creators) {
        try {
            const project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            const creatorsId = await getObjectId.userNameToIdList(creators);
            project.creators = project.creators.concat(creatorsId);
            await project.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async addEndorsements(project_id, endorsements) {
        try {
            const project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            const endorsementsId = await getObjectId.userNameToIdList(endorsements);
            project.endorsements = project.endorsements.concat(endorsementsId);
            await project.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async addTags(project_id, tags) {
        try {
            const project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            const tagsId = await getObjectId.tagNameToIdList(tags);
            project.tags = project.tags.concat(tagsId);
            await project.save();
            return 1;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async addFeedback(project_id, feedback) {
        try {
            const userId = await getObjectId.userNameToId(feedback.reviewer);
            if (userId === -1) {
                throw new Error("User not found");
            }
            const newFeedback = {
                reviewer: userId,
                message: {
                    rating: feedback.rating,
                    text: feedback.text,
                    timestamp: feedback.timestamp
                }
            };
            const project = await Project.findById(project_id);
            if (!project) {
                throw new Error("Project not found");
            }
            project.feedbacks.push(newFeedback);
            const n = project.feedbacks.length;
            project.rating = (project.rating * (n - 1) + newFeedback.message.rating) / n;
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
            console.error(error);
            return 0;
        }
    }
        
}

module.exports = ProjectController;
