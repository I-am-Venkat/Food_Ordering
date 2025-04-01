import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

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

    app.listen(PORT,()=>{
        connectDB();
        console.log(`Server running on https://localhost:${PORT}`);
    })


