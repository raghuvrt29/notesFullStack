const express=require("express");
const bodyParser=require("body-parser");
const userRoute=require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
const db = require("./utils/connectDB")

require("dotenv").config();

const app=express();
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