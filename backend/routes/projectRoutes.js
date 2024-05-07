const express = require("express");
const projectRouter = express.Router();
const getObjectId = require("../functions/getObjectId.js");
//Import Controllers
const ProjectController = require("../controllers/projectFunctions.js");
const Project = require("../models/projectModel.js");
const User = require("../models/userModel.js");
const UserController = require("../controllers/userFunctions.js");
//Api Routes Declare

// WORKING
projectRouter.post("/addNewProject", async (req,res)=>{
   
   let project_id;
    try {
        // console.log(req.body)
        var UC=new UserController()
        await UC.checkUsersExistence(req.body.collaboratorName)
        var project_details = {
            title: req.body.title,
            name : req.body.name,
            description: req.body.description,
            projectLink: req.body.links,
            demoLinks:req.body.projectImages,
            ongoing: req.body.ongoing,
            level:req.body.level,   
            projectImage: {
                url: req.body.url, // Set the image URL from the request body
                filename: req.body.imageName // You might need to get the filename from the request body as well
              },
              openForCollaboration:req.body.openForCollaboration,
                  

        };
        var PC = new ProjectController();
         project_id = await PC.addProject(project_details);
        if(req.body.collaboratorName){
          await PC.addCreators(project_id,req.body.collaboratorName);
        }
        if(req.body.tags){
         await  PC.addTags(project_id,req.body.tags);
        }
        // console.log('away');
        // console.log(project_id);
        res.send(project_id);
    } catch (error) {
        // console.log('home')
        // console.error(error);
        if (project_id) {
            await Project.findByIdAndDelete(project_id);
        }
        res.status(500).json({ error:  error.message  });

    }
});

// WORKING
projectRouter.delete("/deleteProjects" ,async (req,res)=>{
    try {
        let projectName = req.body.name;
        let project_id = await getObjectId.projectNameToId(projectName);
        let deletedProject = await new ProjectController().delProjects(project_id);
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

projectRouter.post("/addfeedback/:username" , async(req,res)=>{
    const username = req.params.username;

    let project = req.body.projectname;
    let feedback = {  
        rating : req.body.rating,
        text : req.body.text,  
        img:req.body.img,             
    }
    let addedFeedback = new ProjectController().addFeedback(project ,username, feedback);
    if(addedFeedback == 1){
        res.send("ADDED FEEDBACK");
    }
    else {
        res.send("ERROR")
    }
})

projectRouter.post("/addNewCollaborator/:username/:projectName" , async(req,res)=>{
    const username = req.params.username;
    const projectName = req.params.projectName;

    let addedUser =await new ProjectController().addNewCollaborators(projectName ,username);
 
    if(addedUser == 1){
        res.send("ADDED addedUser");
    }
    else {
        res.send("ERROR")
    }
})
// projectRouter.post("/addLikes" , async(req,res)=>{
//     const projectname = req.body.projectname;
//     let likes = req.body.endorsements;
//     const addedLikes = await new ProjectController().addLikes(projectname ,likes);
//     if(addedLikes == 1){
//         res.send("ADDED FEEDBACK");
//     }
//     else {
//         res.send("ERROR")
//     }
// })


projectRouter.post("/addLikedProject/:username", async (req, res) => {
    try {
        
        const username=req.params.username;             
        let projectname = req.body.projectname;
        let likes = req.body.endorsements;
        const data = await new ProjectController().addLikedProject(username, projectname,likes);
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

projectRouter.post("/removeLikedProject/:username", async (req, res) => {
    try {
        const username=req.params.username;
        let projectname = req.body.projectname;
        let likes = req.body.endorsements;
        const data = await new ProjectController().removeLikedProject(username, projectname,likes);
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





projectRouter.get("/popularProjects" , async(req,res)=>{
    try {
        let projectList = await Project.find({});
        let data = await new ProjectController().sortProjectByPopularity(projectList);
        res.send(data);
    } catch (error) {
        res.send("ERROR")
    }
})

projectRouter.get("/recentProjects" ,async (req,res)=>{
    try {
        let projectList = await Project.find({});
        let data = await new ProjectController().sortProjectByTime(projectList);
        res.send(data);
    } catch (error) {
        res.send("ERROR");
    }
})

projectRouter.get("/commonProjects" ,async (req,res)=>{
    try {
        let user = await User.findOne(req.body.user);
        let allProjects = await Project.find({});
        let data = await new ProjectController().sortProjectsByFriends(user , allProjects);
        res.send(data);
    } catch (error) {
        res.send("ERROR");
    }
})
projectRouter.get("/ongoingProjects/:username", async (req, res) => {
    try {
        // Find the user based on the request parameter
        const username = req.params.username;
        let UC = new UserController();
        const user = await UC.getUserByUsername(username);
        const userProjects = user.projects;

        // Find ongoing projects without user's ones
        let ongoingProjects = await Project.find({ 
            ongoing: true,
            _id: { $nin: userProjects } // Exclude user's projects
        });

        const updatedProjects = await Promise.all(ongoingProjects.map(async project => {
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
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

projectRouter.get("/userProjects/:username", async (req, res) => {
    try {
        // Find the user based on the request parameter
        const username = req.params.username;
        let UC = new UserController();
        const user = await UC.getUserByUsername(username);

       const updatedUser=user.skills.map(async skillId => {
        const skillInfo = await new ProjectController().getTagInfoById(skillId);
        return { skill: skillInfo.name, color: skillInfo.color}
       })
       const userSkills = await Promise.all(updatedUser);

       const updatedFriends=await UC .userIdToNameAndProfileList(user.friends);
       const friends=updatedFriends.map(friend=>({
        name:friend.username,
        imageUrl:friend.profilePic,
        email:friend.email,
        department:friend.department,
       }));
       
        const userProjects = user.projects;

        let ongoingProjects = await Project.find({     
            _id: { $in: userProjects } 
        });
        const updatedProjects = await Promise.all(ongoingProjects.map(async project => {
            const creatorUsernames = await UC.userIdToNameAndProfileList(project.creators);
            const creators = creatorUsernames.map(creator => ({
                username: creator.username,
                profilePic: creator.profilePic,
            }));
     
            const tagInfoPromises = project.tags.map(async tagId => {
                const tagInfo = await new ProjectController().getTagInfoById(tagId);
                return { name: tagInfo.name, color: tagInfo.color };
            });
            const tagsInfo = await Promise.all(tagInfoPromises);
        
            
            return { ...project.toObject(), creators: creators,tags:tagsInfo };
        }));
        res.send({updatedProjects:updatedProjects,user: { ...user.toObject(), skills: userSkills,friends:friends }});
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

projectRouter.get("/completedProjects/:username", async (req, res) => {
    try {
        // Find the user based on the request body
        const username = req.params.username;
        const user = await new UserController().getUserByUsername(username);
        let UC=new UserController()

        const userProjects=user.projects
        // Find ongoing projects
        let completedProjects = await Project.find({   ongoing: false,
            _id: { $nin: userProjects }  });
            const updatedProjects = await Promise.all(completedProjects.map(async project => {
                const creatorUsernames = await  UC.userIdToNameAndProfileList(project.creators);
                // console.log(creatorUsernames)
                const creators = creatorUsernames.map((creator, index) => ({
                    username: creatorUsernames[index].username,
                    profilePic: creatorUsernames[index].profilePic
                }));


               const tagInfoPromises = project.tags.map(async tagId => {
                const tagInfo = await new ProjectController().getTagInfoById(tagId);
                return { name: tagInfo.name, color: tagInfo.color };
            });
            const tagsInfo = await Promise.all(tagInfoPromises);
        
            
            return { ...project.toObject(), creators: creators,tags:tagsInfo };
            }));
        res.send(updatedProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
projectRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await Project.findByIdAndUpdate(id, req.body.project, { new: true });
        if (!updatedProject) {
            return res.status(404).send("Project not found");
        }
        res.send("UPDATED");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});


// projectRouter.post("/addfeedbacks" ,async (req,res)=>{
//     let projectName = req.body.name;
//     let feedback = req.body.feedback;
//     let data = addFeed
// })
module.exports = projectRouter;