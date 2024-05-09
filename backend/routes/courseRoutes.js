const express = require("express");
const courseRouter = express.Router();

const CourseController = require("../controllers/courseFunctions.js");
const Course = require("../models/courseModel.js");
const getObjectId = require("../functions/getObjectId.js");
const Tag = require("../models/tagModels.js");
const UserController = require("../controllers/userFunctions.js");
const ProjectController =require("../controllers/projectFunctions.js")

//WORKING
courseRouter.post("/addNewCourse", async (req, res) => {
    let course_id;
    try {
        // console.log(req.body)
        var exc = false;
        try{
            var users = await getObjectId.userNameToIdList(req.body.collaboratorName);
        }catch (err){
            res.status(500).json({error: "User Not Found"});
            exc = true;
        }finally{
            if(!exc){
                var tags = await getObjectId.tagNameToIdList(req.body.tags);
                var course_details = {
                    id: req.body.id,
                    title: req.body.title,
                    courseImage: {
                        url: req.body.url, // Set the image URL from the request body
                        filename: req.body.imageName // You might need to get the filename from the request body as well
                    },
                    courseInfo: {
                        description: req.body.description,
                        courseLink: req.body.links,
                        demoLinks:req.body.courseImages
                    },
                    tags: tags,
                    level:req.body.level,
                };
                var CC = new CourseController();
                course_id = await CC.addCourse(course_details);
                await CC.addCreators(course_id,users);
                res.send(course_id);
            }
        }
    } catch (error) {
        if (course_id) {
            await Course.findByIdAndDelete(course_id);
        }
        res.status(500).json({ error:  error.message  });
    }
});

courseRouter.post("/editCourseData", async(req,res)=>{
    try{
        let cname = req.body.cname;
        var course = await new CourseController().getCoursebyName(cname);
        res.send(course);
        
    } catch (err){
        res.status(500).send(err.message);
    }
})


// WORKING
courseRouter.get("/all" , async (req,res) => {
    try {
        let allCourses = await new CourseController().getCoursesAll()
        if(allCourses){
            res.json(allCourses);
        }
        else{
            res.send("ERROR");
        }
    } catch (error) {
        console.log(error);
    }    
})

courseRouter.get("/allcourses", async (req, res) => {
    try {
        let UC = new UserController();
        let courses = await Course.find({ 
            // ongoing: true,
            // _id: { $nin: userProjects } // Exclude user's projects
        });
        const updatedCourses = await Promise.all(courses.map(async course => {
            const creatorUsernames = await UC.userIdToNameAndProfileList(course.creators);
            const creators = creatorUsernames.map(creator => ({
                username: creator.username,
                profilePic: creator.profilePic
            }));
            // console.log(updatedProjects);

            const tagInfoPromises = course.tags.map(async tagId => {
                const tagInfo = await new ProjectController().getTagInfoById(tagId);
                return { name: tagInfo.name, color: tagInfo.color };
            });
            const tagsInfo = await Promise.all(tagInfoPromises);
            return { ...course.toObject(), creators: creators,tags:tagsInfo };
        }));
        res.send(updatedCourses);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



// WORKING
courseRouter.get("/popularcourses" ,async (req,res)=>{
    try {
        let allCourses = await Course.find({});
        let popularCourses = await new CourseController().coursesByPopularity(allCourses);
        if(allCourses.length && popularCourses.length){
            res.send(popularCourses);
        }
        else{
            res.send("ERROR");
        }
    } catch (error) {
        console.log(error);
    }
    
})

//WORKING
// courseRouter.delete("/deleteall" , async (req,res) =>{
//     try {
//         let data = await CourseController().removeAllCourses();
//         if(data == 1){
//             res.send("SUCCESS");
//         }
//         else {
//             res.send("ERROR");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })

courseRouter.post("addFeedback/:courseid" , async (req,res)=>{
    try {
        let {courseid} = req.params;
        let {feedback} = req.body;
        let data = await new CourseController().addFeedback(feedback , courseid);
        if(data == 1) {
        console.log("SUCCESS");
        }
        else{
        console.log("ERROR");
        }   
    } catch (error) {
        console.log(error);
    }  
})

// courseRouter.delete("/deletecourse" ,async (req,res)=>{
//     try {
//         let course_title = req.params.title;
//         let data = await new CourseController().removeCourse(course_title);
//         if(data){
//             res.send(data);
//         }
//         else{
//             res.send("error");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })
courseRouter.get("/userCourses/:username", async (req, res) => {
    try {
        // Find the user based on the request parameter
        const username = req.params.username;
        let UC = new UserController();
        const user = await UC.getUserByUsername(username);
        const userCourses = user.courses;

        // Find ongoing projects without user's ones
        let allCourses = await Course.find({ 
            _id: { $in: userCourses } // Exclude user's projects
        });

        const updatedCourses = await Promise.all(allCourses.map(async course => {
            const creatorUsernames = await UC.userIdToNameAndProfileList(course.creators);
            const creators = creatorUsernames.map(creator => ({
                username: creator.username,
                profilePic: creator.profilePic
            }));
            // console.log(updatedProjects);

            const tagInfoPromises = course.tags.map(async tagId => {
                const tagInfo = await new ProjectController().getTagInfoById(tagId);
                return { name: tagInfo.name, color: tagInfo.color };
            });
            const tagsInfo = await Promise.all(tagInfoPromises);
            return { ...course.toObject(), creators: creators,tags:tagsInfo };
        }));
        res.send(updatedCourses);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
courseRouter.post("/search" , async (req,res)=>{
    try {
        console.log("searching",req.body)
        const searchType = req.body.type;
        const searchTerm = req.body.title;
        const searchTags = req.body.tags;
        let UC = new UserController();
        let data = await new CourseController().search(searchType , searchTerm, searchTags);
        if(searchType == "course"){

            const updatedCourses = await Promise.all(data.map(async course => {
                const creatorUsernames = await UC.userIdToNameAndProfileList(course.creators);
                const creators = creatorUsernames.map(creator => ({
                    username: creator.username,
                    profilePic: creator.profilePic
                }));
                // console.log(updatedProjects);
    
                const tagInfoPromises = course.tags.map(async tagId => {
                    const tagInfo = await new ProjectController().getTagInfoById(tagId);
                    return { name: tagInfo.name, color: tagInfo.color };
                });
                const tagsInfo = await Promise.all(tagInfoPromises);
                return { ...course.toObject(), creators: creators,tags:tagsInfo };
            }));
            res.send(updatedCourses);


        }
        else if(searchType == "project"){
            const updatedProjects = await Promise.all(data.map(async project => {
                const creatorUsernames = await UC.userIdToNameAndProfileList(project.creators);
                const creators = creatorUsernames.map(creator => ({
                    username: creator.username,
                    profilePic: creator.profilePic
                }));
                // console.log(updatedProjects);
    
                const tagInfoPromises = project.tags.map(async tagId => {
                    const tagInfo = await new ProjectController().getTagInfoById(tagId);
                    return { name: tagInfo.name, color: tagInfo.color };
                });
                const tagsInfo = await Promise.all(tagInfoPromises);
                return { ...project.toObject(), creators: creators,tags:tagsInfo };
            }));

            res.send(updatedProjects);
        }
        else{
            res.send(data);
        }

    } catch (error) {
        console.log(error);
    }   
})
// WORKING
courseRouter.get("/:username",async (req,res)=>{
    const {username} = req.params;
    const userCompletedCourses = await new CourseController().ourCompletedCourses(username);
    if(userCompletedCourses){
        res.send(userCompletedCourses);
    }
    else{
        res.send("ERROR");
    }
})

courseRouter.get("/commoncourses" , async (req,res)=>{
    try {
        let username = req.body.username;
        let courses = await Course.find({});
        let data = await new CourseController().sortCoursesByFriends(username , courses);
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})
courseRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findByIdAndUpdate(id, req.body.course, { new: true });
        if (!updatedCourse) {
            return res.status(404).send("Course not found");
        }
        res.send("Updated");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

courseRouter.post("/addLikedCourse/:username", async (req, res) => {
    try {
        
        const username=req.params.username;             
        let coursetitle = req.body.coursetitle;
        let likes = req.body.endorsements;
        const data = await new CourseController().addLikedCourse(username, coursetitle,likes);
        if (data === 1) {
            res.send("Project added to liked projects successfully");
        } else if (data === 0) {
            res.send("Failed to add project to liked projects");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

courseRouter.post("/removeLikedCourse/:username", async (req, res) => {
    try {
        const username=req.params.username;
        let coursetitle = req.body.coursetitle;
        let likes = req.body.endorsements;
        const data = await new CourseController().removeLikedCourse(username, coursetitle,likes);
        if (data === 1) {
            res.send("Project removed from liked projects successfully");
        } else if (data === 0) {
            res.send("Failed to remove project from liked projects");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
courseRouter.post("/addfeedback/:username" , async(req,res)=>{
    const username = req.params.username;

    let course = req.body.projectname;
    console.log(78978987);
    console.log(course);
    let feedback = {  
        rating : req.body.rating,
        text : req.body.text,  
        img:req.body.img,             
    }
    let addedFeedback = new CourseController().addFeedback(course ,username, feedback);
    if(addedFeedback == 1){
        res.send("ADDED FEEDBACK");
    }
    else {
  
        res.send("ERROR")
    }
})



module.exports = courseRouter;
