const express=require("express");
const router=express.Router();
const customer=require("../models/authModel.js");

// register the customer
router.get("/",(req,res)=>{// register form
    res.render("registerPage.ejs");
})
router.post("/",(req,res)=>{// customer creation
    const user=customer.findOne({
      username:  req.body.username
    }).then((user)=>{
        if(user){
            res.redirect("/register");
        }else{
            customer.create(req.body).then((data)=>{
                console.log("customer created");
                console.log(data);
                res.redirect("/login");
            }).catch((error)=>{
                console.log("error in creating the customer");
                console.log(error);
            })
        }
    })
   
})



module.exports=router;