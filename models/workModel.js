const mongoose=require("mongoose");

// {workspace_title,workshop_date,workspace_description}


const workSchema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
   workTitle:{
       type:String,
       required:false,
   },
   workDate:{
       type:String,
       required:false,
   },
   workDesc:{
       type:String,
       required:false,
   }
})

const Work=new mongoose.model("Work",workSchema)

module.exports=Work;
