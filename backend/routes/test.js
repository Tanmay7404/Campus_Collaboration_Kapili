const express = require("express");
const router = express.Router();

//Import Controllers
const TestController = require("../controllers/test.js");
const Project = require("../models/projectModel.js");
const User = require("../models/userModel.js");
const Course = require("../models/courseModel.js");
const CourseController = require("../controllers/courseFunctions.js");
const ProjectController = require("../controllers/projectFunctions.js");
//Api Routes Declare

router.get("/", (req, res) => {
    const data = new TestController().Test();
    //Use data = await ..... if async function calling
    res.json({ message: data, status: 1 });
});

router.get("/login", async (req, res) => {
    try {
        let userEmail = req.body.email;
        let user = await User.findOne({ email: userEmail }).populate('projects').populate('coursesCompleted');
        let allOngoingProjects = await Project.find({ ongoing: true });
        let allCompletedProjects = await Project.find({ ongoing: false });
        let userProjects = user.projects;
        let remainingComletedproject = allCompletedProjects.filter(project => !userProjects.includes(project));
        let remainingProjects = allOngoingProjects.filter(project => !userProjects.includes(project));
        // let remainingPopularProjects = new ProjectController().sortProjectByPopularity(remainingProjects);
        let allcourses = await Course.find({});
        let userCourses = user.coursesCompleted;
        let remainingCourses = allcourses.filter(course => !userCourses.includes(course));
        let data = {
            explore: {
                allGroups: [
                    {
                        text: "Ongoing Projects",
                        list_cards: [],
                    },
                    {
                        text: "Completed Course",
                        list_cards: [],
                    },
                    {
                        text: "Completed Course",
                        list_cards: [],
                    }
                ]
            },
        };

        let tagArr = [];
        for (let tag of remainingProjects.tags) {
            tagArr.push({
                name: tag.name,
                color: tag.color
            })
        }
        let feedbackArr = [];
        for (let feedback of remainingProjects.feedbacks) {
            feedbackArr.push({
                heading: feedback.reviewer,
                text: feedback.message.text,
                date: feedback.message.timestamp,
                stars: feedback.message.ratings,
            })
        }
        for (let project of remainingProjects) {
            data.explore.allGroups[0].list_cards.push({
                tags: tagArr, 
                likes: project.likes,
                rating: project.rating,
                projectImage: projectInfo.imageVideolinks.urls,
                additionalImages: project.additionalImages,
                projectTitle: project.title, 
                profileImage: projectInfo.imageVideolinks.filename, 
                aboutProjectText: project.projectInfo.description,       
                feedbackArray: feedbackArr,            
                userName: project.name,
                description: project.projectInfo.description,
                creators: project.creators, 
                createdDate: project.createdAt,
            });
        }
        let tagsOfComp = [];
        for (let tag of remainingComletedproject.tags) {
            tagsOfComp.push({
                name: tag.name,
                color: tag.color,
            })
        }

        let feedbackofComp = [];
        for (let feedback of remainingComletedproject.feedbacks) {
            feedbackofComp.push({
                heading: feedback.reviewer,
                text: feedback.message.text,
                date: feedback.message.timestamp,
                stars: feedback.message.ratings,
            })
        }
        for (let project of remainingComletedproject) {
            data.explore.allGroups[1].list_cards.push({
                tags: tagsOfComp,
                likes: project.likes,
                rating: project.rating,
                projectTitle: project.title,
                aboutProjectText: project.projectInfo.description,
                feedbackArray: feedbackofComp,
                name: project.name,
                description: project.projectInfo.description,
                image: project.projectInfo,
                status: project.ongoing,
                creators: project.creators,
                createdDate: project.createdAt,
            })
        }
        for (let course of remainingCourses) {
            data.explore.allGroups[2].list_cards.push({
                projectTitle: course.title,
                likes: course.likes,
                aboutProjectText: course.description,
                tags: course.tags,
                createdAt: course.createdAt,
                ratings: course.rating,
            })
        }

        let proArr = []
        for (let project of userProjects) {
            arr.push({
                title: project.title,
                likes: project.likes,
                contributors: project.contributors,
                projectImage: project.projectImage,
            })
        }
        let courseArr = [];
        for (let course of userCourses) {
            courseArr.push({
                title: course.title,
                likes: course.likes,
                contributors: course.contributors,
                courseImage: course.courseImage
            })
        }
        let profile = {
            userName: user.username,
            userEmail: user.userEmail,
            profilePic: user.profileInfo.profilePicture,
            userDepartment: user.department,
            userSkills: user.skills,
            projects: proArr,
            courses: courseArr,
        }
        data['profile'] = profile;


        res.json(data);
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;