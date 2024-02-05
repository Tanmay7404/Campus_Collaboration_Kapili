const express = require("express");
const projectRouter = express.Router();

//Import Controllers
const ProjectController = require("../controllers/projectFunctions.js");
//Api Routes Declare

projectRouter.post("/addProject", async (req,res)=>{
    try {
        var project_details = req.body;
        console.log(project_details);
        const data = await new ProjectController().addProject(project_details);

        if (data === 1) {
            res.send("Updated");
        } else {
            res.send("Can't add project");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = projectRouter;