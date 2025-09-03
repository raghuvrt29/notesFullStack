const express=require("express");
const bodyParser=require("body-parser");
const cors=require(cors)
const userRoute=require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
const db = require("./utils/connectDB");
const cookieParser=require("cookie-parser");
require("dotenv").config();

const app=express();

app.use(cookieParser());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));

app.use(express.static(__dirname + '/public'));

app.use("/",userRoute);

app.use("/",noteRoute);

app.listen("3000",async(req,res)=>{
    await db.connectTodb();
    console.log("started");
})