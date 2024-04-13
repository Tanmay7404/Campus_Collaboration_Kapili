    const checkMeaningfull = require("./checkMeaningful.js");

    async function spamDetection (message,hashlist){
        return checkMeaningfull(message,hashlist);
    }
    module.exports = { spamDetection };
