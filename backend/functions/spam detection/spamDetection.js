const checkMeaningfull = require("./checkMeaningful.js");

async function spamDetection (message){
    return checkMeaningfull(message);
}