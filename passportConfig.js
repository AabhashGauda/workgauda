
const LocalStrategy=require("passport-local");
// customerModel import
const customer=require("./models/authModel.js");


exports.initializingPassport=(passport)=>{
    passport.use(new LocalStrategy( (username,password,done)=>{
customer.findOne({username}).then((user)=>{
    if(!user){
        return done(null,false);
    }else{
        return done(null,user);
    }
}).catch((error)=>{
    console.log("error in getting the user auth in initializing passport");
    console.log(" ");
    console.log(" ");
    console.log(" ");
    console.log(error);
    return done(error,false)
})

    }  ))
// }// end bracket


// this is boilerplate code no need to reamember
passport.serializeUser((user,done)=>{
    done(null,user.id);
  });
  
//   passport.deserializeUser(async(id,done)=>{ using async await
//     try {
//        const user=User.findById(id);
//        done(null,user); 
//     } catch (error) {
//         done(error,false);
//     }
//   })

passport.deserializeUser((id,done)=>{
    customer.findById(id).then((user)=>{
        done(null,user);
    }).catch((error)=>{
        done(error,false);
    })
})
  
  
  };
  
  exports. isAuthenticated=(req,res,next)=>{
      if(req.user){
          return next();
      }
          res.redirect("/login");
     
  }