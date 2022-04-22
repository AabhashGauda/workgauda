const mongoose=require("mongoose");
// {board_title,board_desc,board_creation_date)

const cardModel=new mongoose.Schema({
    boardId:{
type:String,
required:true,
    },
    
   cardTitle:{
       type:String,
       reqired:false,
   },
   cardDesc:{
       type:String,
       require:false,
   },
   cardDate:{
       type:String,
       required:false,
   }

})

const Card=new mongoose.model("Card",cardModel)

module.exports=Card;
