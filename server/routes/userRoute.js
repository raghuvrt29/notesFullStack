const express=require("express");
const userRoute=express.Router();
const userController=require("../controllers/userController");
const auth=require("../authentication/verifyTkn")


userRoute.get("/signup",(req,res)=>{
    res.render("signup");
})

userRoute.post("/signup",userController.signup);

userRoute.get("/login",(req,res)=>{
    res.render("login");
})

userRoute.post("/login",userController.login);

userRoute.get("/profile",auth,userController.viewProfile);

userRoute.get("/editProfile",auth,userController.viewEditProfilePage);

userRoute.post("/editProfile",auth,userController.editUserDetails);

userRoute.get("/changePassword",auth,userController.viewChangePassword);

userRoute.post("/changePassword",auth,userController.changePassword);

module.exports=userRoute;