const express=require("express");
const passport = require("passport");

const router=express.Router();
const customer=require("../models/authModel.js");

//passport require
require("../passportConfig.js");

// login
router.get("/",(req,res)=>{
    res.render("login.ejs");
})
router.post("/",passport.authenticate("local",{failureRedirect:"/register"}),(req,res)=>{
    res.redirect("/work");
});

// logout
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/login");
})

module.exports=router;