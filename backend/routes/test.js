const express = require("express");
const router = express.Router();

//Import Controllers
const TestController = require("../controllers/test.js");
//Api Routes Declare

router.get("/", (req,res)=>{
    const data = new TestController().Test();
    //Use data = await ..... if async function calling
    res.json({message: data, status: 1});
});

module.exports = router;