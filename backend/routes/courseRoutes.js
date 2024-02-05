const express = require("express");
const courseRouter = express.Router();

// Import Controllers
const CourseController = require("../controllers/courseFunctions.js");
// Api Routes Declare

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

module.exports = courseRouter;
