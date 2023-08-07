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

userRoute.get("/:userId/profile",auth,userController.viewProfile);

userRoute.get("/:userId/editProfile",auth,userController.viewEditProfilePage);

userRoute.post("/:userId/editProfile",auth,userController.editUserDetails);

userRoute.get("/:userId/changePassword",auth,userController.viewChangePassword);

userRoute.post("/:userId/changePassword",auth,userController.changePassword);

module.exports=userRoute;