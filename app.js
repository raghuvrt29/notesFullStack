const express=require("express");
const bodyParser=require("body-parser");
const userRoute=require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
const db = require("./utils/connectDB");
const ejs = require("ejs");
require("dotenv").config();

const app=express();

app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.json());

app.use("/",userRoute);

app.use("/",noteRoute);

app.listen("3000",async(req,res)=>{
    await db.connectTodb();
    console.log("started");
})