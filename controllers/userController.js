const userService = require("../service/userService");
const jwt = require("jsonwebtoken");
const uuid = require("uuid").v4;
const auth=require("../authentication/signTkn");

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
            return res.status(401).json({message:err.message});
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: "Please fill all the fields." });
            const user=await userService.getUserByEmail(email);
            if(user.password===password){
                const payload={
                    userId:user._id,
                    name:user.name,
                    email:user.email
                }
                const tokens=await auth.signToken(payload);
                return res.json({tokens:tokens});
            }
            else{
                return res.status(401).json({message:"Wrong Password"});
            }
        }
        catch(err){
            return res.status(404).json({message:"Invalid username or password"});
        }
    }
}

module.exports = userController;