const express = require("express");
const courseRouter = express.Router();

const CourseController = require("../controllers/courseFunctions.js");
const Course = require("../models/courseModel.js");


courseRouter.post("/addCourse", async (req, res) => {
    try {
        var course_details = req.body;
        console.log(course_details);
        const data = await new CourseController().addCourse(course_details);

        if (data === 1) {
            res.send("Updated");
        } else {
            res.send("Can't add course");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// get request for all courses
courseRouter.get("/all" , async (req,res) => {
    try {
        let allCourses = await new CourseController().getCoursesAll()
        if(allCourses){
            res.send(allCourses);
        }
        else{
            res.send("ERROR");
        }
    } catch (error) {
        console.log(error);
    }    
})

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

courseRouter.delete("/deleteall" , async (req,res) =>{
    try {
        let res = await CourseController().removeAllCourses();
        if(res == 1){
            res.send("SUCCESS");
        }
        else {
            res.send("ERROR");
        }
    } catch (error) {
        console.log(error);
    }
})

courseRouter.post("/:courseid" , async (req,res)=>{
    try {
        let {courseid} = req.params;
        let {feedback} = req.body;
        let res = await CourseController().addFeedback(feedback , courseid);
        if(res == 1) {
        console.log("SUCCESS");
        }
        else{
        console.log("ERROR");
        }   
    } catch (error) {
        console.log(error);
    }  
})
// single course deletion request
courseRouter.delete("/deletecourse/:courseid" ,async (req,res)=>{
    try {
        let {courseid} = req.params;
        let res = await new CourseController().removeCourse(courseid);
        if(res == 1){
            res.send("Success");
        }
        else{
            res.send("error");
        }
    } catch (error) {
        console.log(error);
    }
})

courseRouter.get("/users/:id",async (req,res)=>{
    const {id} = req.params;
    const userCompletedCourses = await CourseController().ourCompletedCourses(id);
    if(userCompletedCourses){
        res.send(userCompletedCourses);
    }
    else{
        res.send("ERROR");
    }
})
 
module.exports = courseRouter;
