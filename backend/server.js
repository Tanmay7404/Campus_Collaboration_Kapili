//IMPORT MODULES

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const _ = require('lodash');
const cors = require("cors");

const socketIo = require("socket.io");
const { Server } = require("socket.io"); 


const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.set("view engine", "ejs"); 



const server = http.createServer(app);
// const io = socketIo(server);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


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


// //ROOMS FIND
const ROOMS = require("./models/roomModel.js");
// var document = await ROOMS.findOne({});
// if(document==null){
//     document = new ROOMS({
//         rooms: {}
//     });
// }
 //var Rooms= document.rooms;
// Async function to ensure the database connection and document retrieval
async function initialize() {
    try {
        const url = "mongodb+srv://Tanmay:Tanmay@kapilicampuscollaborati.nnisj09.mongodb.net/Campus_DB?retryWrites=true&w=majority";
        mongoose.connect(url).then(() => console.log("Database Connected Successfully")).catch(err => console.log("Database not connected",err));


        const loadHashList = require("./functions/spam_detection/loadHashList.js");
        hashlist = loadHashList();


        // Find or create document
        let document = await ROOMS.findOne({});
        if (document == null) {
            document = new ROOMS({
            });
            await document.save();
        }
        // Export variables
       module.exports = { hashlist, Rooms: document.rooms };
       
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

io.on('connection', socket => {
    console.log('New client connected');
    socket.on('new-user',  (room, name) => {
    
        socket.join(room)
      })


    // Send previous messages to the client
    

    // Handle new messages from the client
    

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('send-chat-message',  async(room, message,username) => {
        const senderId='rgvdgv'
        // console.log(message)
        const messageData={
          sender:senderId,
          message:message,
          timestamp:new Date().toLocaleString()
        };
        await login.findOneAndUpdate({projectName:room},
         { $push: { messages: messageData },
          $set:{ lastMessage: message, lastMessageTime: new Date().toLocaleString }
        },{ new: true }
          );
        socket.broadcast.to(room).emit('chat-message', { message: message, name: username })
      })
});





//ROUTES IMPORT
const userRoutes = require("./routes/userRoutes.js");
app.use("/",userRoutes);

const projectRoutes=require("./routes/projectRoutes.js");
app.use('/projects',projectRoutes);

const courseRoutes=require("./routes/courseRoutes.js");
app.use('/courses',courseRoutes);

const chatRoutes=require("./routes/chatRoutes.js");
app.use('/chats',chatRoutes);
//PORT
const port = process.env.port || 8080;

initialize().then(() => {
    // Start the server after the database initialization
  server.listen(port, function () {
        console.log(`Server Started on Port ${port}`);
    });
}).catch(error => {
    console.error("Initialization error:", error);
});
//LISTENER
// app.listen(port,function(){
//     console.log(`Server Started on Port ${port}`);


// });

//module.exports = {hashlist,Rooms};