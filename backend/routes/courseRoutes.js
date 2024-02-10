const express = require("express");
const courseRouter = express.Router();

const CourseController = require("../controllers/courseFunctions.js");
const Course = require("../models/courseModel.js");
const getObjectId = require("../functions/getObjectId.js");
const Tag = require("../models/tagModels.js");

//WORKING
courseRouter.post("/addCourse", async (req, res) => {
    try {
        let course_details = req.body;
        console.log(course_details);
        const data = await new CourseController().addCourse(course_details);
        let course_title = await Course.findOne({title : req.body.title});
        console.log(course_title);
        let course_id = await getObjectId.courseNameToId(course_title.title);
        if(req.body.tags!=null){
        await new CourseController().addTags(course_id ,req.body.tags);}
        console.log(data);
        if (data) {
            res.send("Updated");
        } else {
            res.send("Can't add course");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
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

courseRouter.post("/:courseid" , async (req,res)=>{
    try {
        let {courseid} = req.params;
        let {feedback} = req.body;
        let data = await CourseController().addFeedback(feedback , courseid);
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
module.exports = courseRouter;
