//IMPORT MODULES

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const _ = require('lodash');
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.set("view engine", "ejs"); 

const loadHashList = require("./functions/spam detection/loadHashList");
hashlist = loadHashList();

//SHOULD WE INCLUDE INTERESTED IN FIELD FOR EACH USER
// function sortProjectsAccToUser(currUser,projectList){
//     projectList.sort((a, b) => {
//         const n1 = _.intersection(currUser.skills,a.tags).length;
//         const n2 = _.intersection(currUser.skills,b.tags).length;
//         if (n1 === n2) {
//             const n3 = _.intersection(currUser.friends,a.creators).length;
//             const n4 = _.intersection(currUser.friends,b.creators).length;
//             if(n3===n4){
//                 return 0;
//             }
//             return n3 < n4 ? -1 : 1;
//         }
//         return n1 < n2 ? -1 : 1;
//     });
//     return projectList;
// }
// //NOT USER
// function getOngoingProjects(currUser){
//     Models.Project.find({ongoing: true}).exec(function(err,data){
//         if(!err){
//             sorted_data = sortProjectsAccToUser(currUser,data);
//             return sorted_data;
//         }
//     });
// }
// //NOT USER
// function getLatestProjects(currUser){
//     Models.Project.find({ongoing: false}).sort((a,b)=>{
//         if(a.completedAt===b.completedAt){
//             return 0;
//         }
//         return a.completedAt < b.completedAt ? -1 : 1;
//     }).limit(30).exec(function(err,data){
//         if(!err){
//             sorted_data = sortProjectsAccToUser(currUser,data);
//             return sorted_data;
//         }
//     });
// }

//DATABASE CONNECT
const url = "mongodb+srv://Tanmay:Tanmay@kapilicampuscollaborati.nnisj09.mongodb.net/Campus_DB?retryWrites=true&w=majority";
mongoose.connect(url).then(() => console.log("Database Connected Successfully")).catch(err => console.log("Database not connected",err));

//ROOMS FIND
const ROOMS = require("./models/roomModel.js");
var document = await ROOMS.findOne({});
if(document==null){
    document = new ROOMS({
        rooms: {}
    });
}
var Rooms= document.rooms;

//ROUTES IMPORT
const userRoutes = require("./routes/userRoutes.js");
app.use("/",userRoutes);

const projectRoutes=require("./routes/projectRoutes.js");
app.use('/',projectRoutes);

const courseRoutes=require("./routes/courseRoutes.js");
app.use('/',courseRoutes);

const chatRoutes=require("./routes/chatRoutes.js");
app.use('/',chatRoutes);
//PORT
const port = process.env.port || 8080;


//LISTENER
app.listen(port,function(){
    console.log(`Server Started on Port ${port}`);


});

module.exports = {hashlist,Rooms};