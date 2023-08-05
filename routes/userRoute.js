const express=require("express");
const userRoute=express.Router();
const userController=require("../controllers/userController");


userRoute.get("/signup",(req,res)=>{
    res.render("signup");
})

userRoute.post("/signup",userController.signup);

userRoute.get("/login",(req,res)=>{
    res.render("login");
})

userRoute.post("/login",userController.login);

module.exports=userRoute;