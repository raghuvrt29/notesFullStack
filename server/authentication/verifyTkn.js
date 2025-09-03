const jwt = require("jsonwebtoken");
const userService = require("../service/userService")
require("dotenv").config();

verifyToken = async (req, res, next) => {
    try {
        const tkn = req.cookies.jwt;
        const verifiedUser = jwt.verify(tkn, process.env.JWT_ACC_SECRET)
        if (verifiedUser) {
            const user = await userService.getUserById(verifiedUser.userId);
            if (user._id === req.params.userId) {
                next();
            }
            else {
                return res.status(401).send("Invalid Token");
            }
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