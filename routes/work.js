const express=require("express");
const router=express.Router();
const passport=require("passport");

// models import.
// const Contact=require("../models/contactModel.js");
const Card=require("../models/cardModel.js");
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

router.get("/boardShow/:id",(req,res)=>{// show the board
    const {id}=req.params;
    console.log("the id for the board show is "+id)
    console.log(Board);
    Board.find({workId:id}).then((data)=>{
        console.log(id+" is being accessed in this");
        console.log("this is the board data :"+data);
        
            res.render("boardShow.ejs",{board:data});
        }).catch((error)=>{
            console.log(error);
        })
})
router.get("/boardDetail/:id",(req,res)=>{
    const {id}=req.params;
    Board.findById(id).then((data)=>{
        res.render("boardDetail.ejs",{board:data});
    }).catch((error)=>{
        console.log("error in showing the individual board data ");
    })
})


// new board 
router.get("/boardNew/:id",(req,res)=>{// for new board making

    const {id}=req.params;
    Work.findById(id).then((data)=>{
console.log(`work id: ${id} is found for edit`);
console.log(data.id);
Board.findById(data.id).then((boardData)=>{
    console.log(boardData);
    res.render("createBoard.ejs",{work:data,board:boardData});
})
       
    }).catch((error)=>{
        console.log(`error in displaying the work id :${id}`);
        console.log(error);
    })
   

});
router.post("/workShow/:id",(req,res)=>{
   const {id}=req.params;
    Work.findById(id).then((work)=>{
console.log(work.id);
        Board.create({
            workId:work.id,
            boardTitle:req.body.boardTitle,
            boardDate:req.body.boardDate,
            boardDesc:req.body.boardDesc,
        }).then((success)=>{
            console.log("new board added");
            res.redirect(`/work/workShow/${id}`);
        }).catch((error)=>{
            console.log("error in adding new board");
            console.log(error);
        });
    }).catch((error)=>{
        console.log("no  work found to create");
        console.log(error);
    })
    
});



//  card show            (boardId);
// /work/boardDetail/62625f179ed0badc287dd4d5

router.get("/cardNew/:id",(req,res)=>{// for new card in board making

    const {id}=req.params;
    Board.findById(id).then((data)=>{
console.log(`board id: ${id} is found for edit`);
console.log(data.id);
Board.findById(data.id).then((boardData)=>{
    console.log(boardData);
    res.render("createCard.ejs",{board:boardData});
})
       
    }).catch((error)=>{
        console.log(`error in displaying the work id :${id}`);
        console.log(error);
    })
   

});

router.post("/boardDetail/:id",(req,res)=>{
    const {id}=req.params;
     Board.findById(id).then((board)=>{
 console.log(board.id);
         Card.create({
             boardId:board.id,
             cardTitle:req.body.cardTitle,
             cardDate:req.body.cardDate,
             cardDesc:req.body.cardDesc,
         }).then((success)=>{
             console.log("new card added");
             res.redirect(`/work/cardShow/${id}`);
         }).catch((error)=>{
             console.log("error in adding new card");
             console.log(error);
         });
     }).catch((error)=>{
         console.log("no  board found to create");
         console.log(error);
     })
     
 });


 router.get("/cardShow/:id",(req,res)=>{// show the cards
    const {id}=req.params;
    console.log("the id for the board show is "+id)
    // console.log(card);
    Card.find({boardId:id}).then((data)=>{
        console.log(id+" is being accessed in this");
        console.log("this is the board data :"+data);
        
            res.render("cardShow.ejs",{card:data});
        }).catch((error)=>{
            console.log(error);
        })
})


router.get("/cardDetail/:id",(req,res)=>{
    const {id}=req.params;
   Card.findById(id).then((data)=>{
        res.render("cardDetail.ejs",{card:data});
    }).catch((error)=>{
        console.log("error in showing the individual board data ");
    })
})












module.exports=router;