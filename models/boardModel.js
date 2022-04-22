const mongoose=require("mongoose");
// {board_title,board_desc,board_creation_date)

const boardSchema=new mongoose.Schema({
    workId:{
type:String,
required:true,
    },
    
   boardTitle:{
       type:String,
       reqired:false,
   },
   boardDesc:{
       type:String,
       require:false,
   },
   boardDate:{
       type:String,
       required:false,
   }

})

const Board=new mongoose.model("Board",boardSchema)

module.exports=Board;
