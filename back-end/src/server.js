const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const User = require("./model/user.model.js");
dotenv.config();
connectDB();

// Server//
const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors(
    {
        origin:"http://localhost:3000",
        methods:["GET","POST","DELETE","PUT"],
        credentials:true,
        allowedHeaders:["Content-Type","Authorization"],
    }
));
app.use(express.json());
//
const SendData=require("./controller/dummyInserts");
app.post("/Register",SendData);

const validateUser=require("./controller/validUser.js");
app.post("/login",validateUser);






// ---------------------------------------------------------------------
//App listen//
app.listen(PORT,()=>{
    console.log(`Server running on https://localhost:${PORT}`);
})  
//----------------------------------------------------------------------


//Dummy DB

// const users=[
//     {mobilenumber:"9090909090",password:"sathish@123"},
//     {mobilenumber:"8825780899",password:"admin@123"}
// ];

// app.get("/",(req,res)=>{
//     res.send("Hello World !");
// })

// app.post("/login",(req,res)=>{
//     const {mobilenumber,password}=req.body;

//     const user=users.find(u=>u.mobilenumber==mobilenumber && u.password==password);
        
//     if(user){
//         res.json({success:true,msg:"Login Successfull"});
//     }
//     else{
//         res.json({success:false,msg:"Invalid"});
//     }
//     })

   

