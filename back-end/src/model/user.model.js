const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    mobilenumber:{
        type:Number,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
    },
},
{
    timestamps:true,
});

const User=mongoose.model("User",userSchema);
module.exports=User;

