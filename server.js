const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
var _ = require('lodash');
const Models= require("./models/database_schema.js");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs"); 

//SHOULD WE INCLUDE INTERESTED IN FIELD FOR EACH USER
function sortProjectsAccToUser(currUser,projectList){
    projectList.sort((a, b) => {
        const n1 = _.intersection(currUser.skills,a.tags).length;
        const n2 = _.intersection(currUser.skills,b.tags).length;
        if (n1 === n2) {
            const n3 = _.intersection(currUser.friends,a.creators).length;
            const n4 = _.intersection(currUser.friends,b.creators).length;
            if(n3===n4){
                return 0;
            }
            return n3 < n4 ? -1 : 1;
        }
        return n1 < n2 ? -1 : 1;
    });
    return projectList;
}

function getOngoingProjects(currUser){
    Models.Project.find({ongoing: true}).exec(function(err,data){
        if(!err){
            sorted_data = sortProjectsAccToUser(currUser,data);
            return sorted_data;
        }
    });
}

function getLatestProjects(currUser){
    Models.Project.find({ongoing: false}).sort((a,b)=>{
        if(a.completedAt===b.completedAt){
            return 0;
        }
        return a.completedAt < b.completedAt ? -1 : 1;
    }).limit(30).exec(function(err,data){
        if(!err){
            sorted_data = sortProjectsAccToUser(currUser,data);
            return sorted_data;
        }
    });
}

const url = "mongodb+srv://Tanmay:Tanmay@kapilicampuscollaborati.nnisj09.mongodb.net/?retryWrites=true&w=majority/sample_mflix";
mongoose.connect(url);


const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
    console.log("Server Started on Port 3000");
});
