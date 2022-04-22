const express=require("express");
const http=require("http");
const bodyParser=require("body-parser");
const methodOverride=require("method-override");
const path=require("path");




// dot env require
require("dotenv").config();
// database
const mongoose=require("mongoose");
const connectDb=require("./database/database.js");
// const DATABASE_URL="mongodb://localhost:27017/newContactList";
const DATABASE_URL="mongodb+srv://aabhashG:aabhash@cluster0.rgddj.mongodb.net/WORKSPACE?retryWrites=true&w=majority"
connectDb(DATABASE_URL);


// express initialization.
const app=express();
const port=process.env.PORT||80;

// middleware
app.use(bodyParser.urlencoded({extended:false})); // or we can use the express to parse also.
app.use(express.urlencoded({extended:true}));
app.use(express.json());// this is to parse json data
app.use(methodOverride("_method"));


//template engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));



// authentication(passport)
const passport =require("passport");
const expressSession=require("express-session");
const{initializingPassport,isAuthenticated} =require("./passportConfig.js");
require("./passportConfig.js");
initializingPassport(passport);


app.use(expressSession({secret:"secret",resave:false,saveUninitialized:false}))
app.use(passport.initialize());
app.use(passport.session());









//routes import
const homeRoute=require("./routes/home");

const aboutRoute=require("./routes/about");
const registerRoute=require("./routes/register.js");
const loginRoute=require("./routes/login.js");
const { initialize } = require("passport");
const workRoute=require("./routes/work.js");

// routes initialize
app.use("/",homeRoute);
app.use("/about",aboutRoute);

app.use("/register",registerRoute);
app.use("/login",loginRoute);
                  // work sites
app.use("/work",isAuthenticated,workRoute);





//error page
app.use((req,res)=>{
    res.status(404).redirect("/");
})




// server creation
app.listen(port,(error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("server started");
    }
})
