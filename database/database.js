const mongoose=require("mongoose");

require("dotenv").config();


const connectDb=(DATABASE_URL)=>{
    return mongoose.connect(DATABASE_URL).then((success)=>{
        console.log("database connected");
    }).catch((error)=>{
        console.log("error in connecting the database");
        console.log(error);
    });
}


module.exports=connectDb;