// Server//

const express=require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
require("dotenv") .config();

const app=express();
const PORT=process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//Dummy DB

const users=[
    {mobilenumber:"9090909090",password:"sathish@123"},
    {mobilenumber:"8825780899",password:"admin@123"}
];

app.get("/",(req,res)=>{
    res.send("Hello World !");
})

app.post("/login",(req,res)=>{
    const {mobilenumber,password}=req.body;

    const user=users.find(u=>u.mobilenumber==mobilenumber && u.password==password);
        
    if(user){
        res.json({success:true,msg:"Login Successfull"});
    }
    else{
        res.json({success:false,msg:"Invalid"});
    }
    })

    app.listen(PORT,()=>{
        console.log(`Server running on https://localhost:${PORT}`);
    })


