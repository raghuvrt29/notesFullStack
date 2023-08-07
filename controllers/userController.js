const userService = require("../service/userService");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;
const auth = require("../authentication/signTkn");

const userController = {
    signup: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                return res.status(400).json({ message: "Please fill all the fields." });
            if (await userService.getUserByEmail(email))
                return res.status(401).json({ message: "You are already signed up, please login." });
            const user = {
                _id: uuid(),
                name: name,
                email: email,
                password: password
            }
            let result = await userService.addUser(user);
            res.send("Signed up successfully, please login.");
        }
        catch (err) {
            return res.status(401).json({ message: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: "Please fill all the fields." });
            const user = await userService.getUserByEmail(email);
            if(!user)
                return res.status(404).json({message:"User with this email id doesn't exist"});
            if (user.password === password) {
                const payload = {
                    userId: user._id,
                    name: user.name,
                    email: user.email
                }
                const accToken = await auth.signToken(payload);
                res.cookie('jwt', accToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                });
                return res.redirect("/"+payload.userId);
            }
            else {
                return res.status(401).json({ message: "Wrong Password" });
            }
        }
        catch (err) {
            return res.status(404).json({ message: "Invalid username or password" });
        }
    },
    viewProfile: async(req,res)=>{
        try{
            const user= await userService.getUserById(req.params.userId);
            if(!user)
                return res.status(400).json({message:"user doesn't exist"});
            return res.render("userProfile",user);
        }
        catch(err){
            return res.status(401).json({message:err.message});
        }
    },
    viewEditProfilePage: async(req,res)=>{
        try{
            const user= await userService.getUserById(req.params.userId);
            if(!user)
                return res.status(400).json({message:"user doesn't exist"});
            return res.render("editProfile",user);
        }
        catch(err){
            return res.status(401).json({message:err.message});
        }
    },
    editUserDetails: async(req,res)=>{
        try{
            const user=await userService.getUserById(req.params.userId);
            if(!user)
                return res.status(400).json({message:"user doesn't exist"});
            const {newName,newEmail}=req.body;
            if(!newName || !newEmail)
                return res.status(400).json({message:"Please fill all the fields"});

            const obj={
                name:newName,
                email:newEmail
            }
            const result=await userService.editUserDetails(user._id,obj);
            return res.redirect("/"+user._id+"/profile");
        }
        catch(err){
            return res.status(401).json({message:err.message});
        }
    },
    viewChangePassword: async(req,res)=>{
        try{
            const user= await userService.getUserById(req.params.userId);
            if(!user)
                return res.status(400).json({message:"user doesn't exist"});
            
            return res.render("changePassword",user);
        }
        catch(err){
            return res.status(401).json({message:err.message});
        }
    },
    changePassword: async(req,res)=>{
        try{
            const user=await userService.getUserById(req.params.userId);
            if(!user)
                return res.status(400).json({message:"user doesn't exist"});

            const {oldPassword,newPassword}=req.body;
            if(user.password===oldPassword){
                const result=await userService.changePassword(user._id,newPassword);
                return res.redirect("/"+user._id+"/profile");
            }
            else{
                return res.status(401).json({message:"Enter the correct old password"});
            }
        }
        catch(err){
            return res.status(401).json({message:err.message});
        }
    }
}

module.exports = userController;