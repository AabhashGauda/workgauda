const express=require("express");

const router=express.Router();

router.get("/",(req,res)=>{
    // res.send(`<h1>click to go to work page </h1> <br> <a href="/work">visit work</a>`);
    res.render("home.ejs");
})


module.exports=router;