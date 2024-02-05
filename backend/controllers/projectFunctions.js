const Project = require("../models/projectModel.js"); // Assuming the correct path to your projectModel file

class ProjectController {
    async addProject(project_details) {
        try {
            const project = new Project({
                title: project_details.title,
                projectInfo: {
                    description: project_details.description,
                    videoLink: project_details.videoLink,
                    photoLink: project_details.photoLink,
                    projectLink: project_details.projectLink
                },
                creators: project_details.creators, // Assuming creators is an array of user IDs
                endorsements: [],
                tags: project_details.tags, // Assuming tags is an array of strings
                ongoing: project_details.ongoing || false,
                feedbacks: [],
                rating: project_details.rating,
                chat: project_details.chat, // Assuming chat is a chat ID
                issues: []
            });

            await project.save();
            return 1;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }
}

module.exports = ProjectController;
