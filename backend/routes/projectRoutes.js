const express = require("express");
const projectRouter = express.Router();
const getObjectId = require("../functions/getObjectId.js");
//Import Controllers
const ProjectController = require("../controllers/projectFunctions.js");
const Project = require("../models/projectModel.js");
//Api Routes Declare

// WORKING
projectRouter.post("/addProject", async (req,res)=>{
    try {
        var project_details = {
            title: req.body.title,
            name : req.body.name,
            description: req.body.description,
            projectlinks: req.body.projectlinks,
            ongoing: req.body.ongoing
        };
        var PC = new ProjectController();
        var project_id = await PC.addProject(project_details);
        if(req.body.creators){
            PC.addCreators(project_id,req.body.creators);
        }
        if(req.body.tags){
            PC.addTags(project_id,req.body.tags);
        }
        res.send(project_id);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
// WORKING
projectRouter.delete("/deleteProjects" ,async (req,res)=>{
    try {
        let projectName = req.body.name;
        let project_id = await getObjectId.projectNameToId(projectName);
        let deletedProject = await new ProjectController().delProjects(project_id);
        console.log(deletedProject);
        res.send(deletedProject);
    } catch (error) {
        console.log(error);
    }
})

projectRouter.put("/editProjects" ,async (req,res)=>{
    try {
        let projectId = req.body.id;
        let project_details = {
        title: req.body.title,
        name : req.body.name,
        description: req.body.description,
        projectlinks: req.body.projectlinks,
    }
    var PC = new ProjectController();
    let data = await PC.editProjects(projectId , project_details);
    console.log(data);
    var project_id = await PC.addProject(project_details);
    if(req.body.creators){
        PC.addCreators(project_id,req.body.creators);
    }
    if(req.body.tags){
        PC.addTags(project_id,req.body.tags);
    }
    if(req.body.ongoing){
        PC.changeCompleted(project_id , project_details.ongoing);
    }
    } catch (error) {
        console.log(error);
    }
    
})

projectRouter.post("/addfeedbacks" , async(req,res)=>{
    let project = req.body.projectId;
    let feedback = {
        reviewer : req.body.username,    
        rating : req.body.rating,
        text : req.body.text,               
    }
    let addedFeedback = new ProjectController().addFeedback(project , feedback);
    if(addedFeedback == 1){
        res.send("ADDED FEEDBACK");
    }
    else {
        res.send("ERROR")
    }
})
module.exports = projectRouter;