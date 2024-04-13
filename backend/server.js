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

const loadHashList = require("./functions/spam_detection/loadHashList.js");

    const {spamDetection} = require("./functions/spam_detection/spamDetection.js");

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
let hashlist
let room
async function initialize() {
    try {
        const url = "mongodb+srv://Tanmay:Tanmay@kapilicampuscollaborati.nnisj09.mongodb.net/Campus_DB?retryWrites=true&w=majority";
        mongoose.connect(url).then(() => console.log("Database Connected Successfully")).catch(err => console.log("Database not connected",err));


        hashlist = await loadHashList();
        


        // Find or create document
        let document = await ROOMS.findOne({});
        if (document == null) {
            document = new ROOMS({
            });
            await document.save();
        }
        room=document.rooms
        // Export variables
       module.exports = { hashlist, Rooms: document.rooms };
       
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

io.on('connection', socket => {
    console.log('New client connected ',socket.id);
    socket.on('join_room',  (room) => {
        socket.join(room)
      })

  
    
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('send_chat_message',  async(data) => {
        
       let a=await spamDetection(data.message.message,hashlist);
 console.log(a)
if( ( a==0))
{
console.log('checked_spam')
socket.emit('checked_spam',{ message: data.message, name: data.username ,chatId:data.room})}else{

        socket.broadcast.to(data.room).emit('receive_message', { message: data.message, name: data.username ,chatId:data.room})}
      });
//     socket.on('check_spam',async(data)=> {
//    if( spamDetection(data.message)==true)
//    {

//    }else
//    {

//    }
    
//     })

      socket.on('delete_chat_message',  async(data) => {
 

        io.to(data.room).emit('delete_message', { message: data.message, name: data.username ,chatId:data.room})
      });
      socket.on('send_global_message',  async(data) => {
        let a=await spamDetection(data.message.message,hashlist);
        console.log(a)
       if( ( a==0))
       {
socket.emit('checked_spam',{ message: data.message, name: data.username ,chatId:data.room})

}else{
        socket.broadcast.to(data.room).emit('receive_global_message', { message: data.message, name: data.username ,chatId:data.room})}
      });

//     socket.on('check_spam',async(data)=> {
  
//    }else
//    {

//    }
    
//     })
    //   socket.on('delete_chat_message',  async(data) => {
 

    //     socket.broadcast.to(data.room).emit('delete_message', { message: data.message, name: data.username ,chatId:data.room})
    //   });



     
});





//ROUTES IMPORT
const userRoutes = require("./routes/userRoutes.js");
app.use("/user",userRoutes);

const Routes = require("./routes/test.js");
app.use("/home",Routes);

const projectRoutes=require("./routes/projectRoutes.js");
app.use('/projects',projectRoutes);

const courseRoutes=require("./routes/courseRoutes.js");
app.use('/courses',courseRoutes);

const chatRoutes=require("./routes/chatRoutes.js");
app.use('/chats',chatRoutes);

const loginRoutes=require("./routes/loginRoutes.js");
app.use('/',loginRoutes);

const imageRoutes=require("./routes/ImagesRoutes.js");
const { healthcare_v1 } = require("googleapis");
app.use('/image', imageRoutes);

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

// module.exports = {hashlist,room};