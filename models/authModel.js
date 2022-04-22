const mongoose=require("mongoose");


const authSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

const RegisteredCustomer=new mongoose.model("RegisteredCustomer",authSchema);

module.exports=RegisteredCustomer;