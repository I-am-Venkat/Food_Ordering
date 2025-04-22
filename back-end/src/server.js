const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const User = require("./model/user.model.js");
const Restaurant = require("./model/restaurant.model.js");
const Food = require("./model/food.model.js");
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

const addRestaurant=require("./controller/addRestaurants");
app.post("/addRestaurants",addRestaurant);

const addFood=require("./controller/addFood");
app.post("/addFood",addFood);

// ---------------------------------------------------------------------
//App listen//
app.listen(PORT,()=>{
    console.log(`Server running on https://localhost:${PORT}`);
})  
//----------------------------------------------------------------------

