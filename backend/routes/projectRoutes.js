const express = require("express");
const projectRouter = express.Router();

//Import Controllers
const ProjectController = require("../controllers/projectFunctions.js");
//Api Routes Declare

projectRouter.post("/addProject", async (req,res)=>{
    try {
        var project_details = {
            title: req.body.title,
            description: req.body.description,
            projectlinks: req.body.projectlinks,
            ongoing: req.body.ongoing
        };
        var PC = new ProjectController();
        var project_id = await PC.addProject(project_details);
        PC.addCreators(project_id,req.body.creators);
        PC.addTags(project_id,req.body.tags);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = projectRouter;