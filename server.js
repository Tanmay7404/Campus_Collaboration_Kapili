const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
var _ = require('lodash');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs"); 


const url = "mongodb+srv://Tanmay:Tanmay@kapilicampuscollaborati.nnisj09.mongodb.net/?retryWrites=true&w=majority/sample_mflix";
mongoose.connect(url, {useNewUrlParser:true});




const PORT = process.env.PORT || 3000;

app.listen(PORT,function(){
    console.log("Server Started on Port 3000");
});
