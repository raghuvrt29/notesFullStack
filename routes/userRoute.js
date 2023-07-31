const express=require("express");
const userRoute=express.Router();
const userController=require("../controllers/userController");

userRoute.get("/signup",(req,res)=>{
    res.send("Signup using post");
})

userRoute.post("/signup",userController.signup);

userRoute.get("/login",(req,res)=>{
    res.send("Login using post");
})

userRoute.post("/login",userController.login);

module.exports=userRoute;