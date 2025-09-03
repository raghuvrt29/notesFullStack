const jwt=require("jsonwebtoken");
require("dotenv").config();

signToken={
    signToken:async payload=>{
        try{
            accTkn=jwt.sign(payload,process.env.JWT_ACC_SECRET);
            return accTkn;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports=signToken;