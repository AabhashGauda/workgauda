const express=require("express");
const router=express.Router();
const passport=require("passport");

// models import.
// const Contact=require("../models/contactModel.js");
const Board=require("../models/boardModel.js");
const Work=require("../models/workModel.js");
const customer=require("../models/authModel.js")

// const customerId=customer.id;// globally userid declaration 


router.get("/",(req,res)=>{  // all authentication will see the same data as different models on contact and one user
    // res.send("this is contact page");

customer.findById(req.user.id).then((user)=>{
    if(!user){
        res.redirect("/login");
    }else{
        console.log("id of the login user is "+user.id);

        Work.find({userid:user.id}).then((data)=>{
            console.log(user.id);
            console.log("work data is "+data);
            res.render("workPage.ejs",{work:data});
        }).catch((error)=>{
            console.log("error in displaying the works");
            console.log(error);
        })
    }
})


   
});
// new work 
router.get("/workNew",(req,res)=>{
    res.render("createWork");
});
router.post("/workNew",(req,res)=>{
    customer.findById(req.user.id).then((user)=>{
        Work.create({
            userid:user.id,
            workTitle:req.body.workTitle,
            workDate:req.body.workDate,
            workDesc:req.body.workDesc,
        }).then((success)=>{
            console.log("new work added");
            res.redirect("/work");
        }).catch((error)=>{
            console.log("error in adding new work");
            console.log(error);
        });
    }).catch((error)=>{
        console.log("no  user found to create");
        console.log(error);
    })
    
});

// functionality additional


// // show work
router.get("/workShow/:id",(req,res)=>{
    const {id}=req.params;
    Work.findById(id).then((data)=>{
console.log(`work id: ${id} is found for edit`);
        res.render("workShow.ejs",{work:data});
    }).catch((error)=>{
        console.log(`error in displaying the work id :${id}`);
        console.log(error);
    })
   
})
// router.patch("/contactEdit/:id",(req,res)=>{
//     const {id}=req.params;
//     Work.findByIdAndUpdate(id,{
//         workTitle:req.body.workTitle,
//             workDate:req.body.workDate,
//             workDesc:req.body.workDesc,
//     }).then((success)=>{
//         console.log(`${id} work is updated successfully`);
//         res.redirect("/contact");
//     }).catch((error)=>{
//         console.log(`error in updating ${id} work `);
//         console.log(error);
//     })
// });

// // contact delete
// router.get("/contactDelete/:id",(req,res)=>{ // this is delete by normal get request
//     const id=req.params.id;
//     Contact.findByIdAndDelete(id).then((success)=>{
//         console.log(`${id} contact is deleted`);
//         res.redirect("/contact");
//     }).catch((error)=>{
//         console.log(`error in deleteing the ${id} contact`);
//         console.log(error);
//     })
// })


module.exports=router;