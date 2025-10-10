const jwt = require("jsonwebtoken");
const userService = require("../service/userService")
require("dotenv").config();

verifyToken = async (req, res, next) => {
    try {
        const tkn = req.headers.authorization;
        
        if(!tkn){
            return res.status(401).send("Please login first...");
        }

        const verifiedUser = jwt.verify(tkn.split(" ")[1], process.env.JWT_ACC_SECRET)
        if (verifiedUser) {
            req.user = verifiedUser;
            next();
        }
        else {
            return res.status(401).send("invalid token");
        }
    }
    catch (err) {
        return res.status(401).send(err.message);
    }
}

module.exports = verifyToken;