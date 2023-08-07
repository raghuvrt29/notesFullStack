const User = require("../models/userDB");
const mongoose=require("mongoose");

const userService = {
    addUser: async user => {
        try {
            return await new User(user).save();
        }
        catch (err) {
            throw err;
        }
    },
    getUserById: async id => {
        try {
            return await User.findById(id);
        }
        catch (err) {
            throw err;
        }
    },
    getUserByEmail: async email => {
        try {
            return await User.findOne({ email: email });
        }
        catch (err) {
            throw err;
        }
    },
    addNote: async (userId, noteId) => {
        try {
            return await User.updateOne(
                { _id: userId },
                {
                    $push: {
                        notes:
                            { noteId: noteId }
                    }
                }
            );
        }
        catch(err){
            throw err;
        }
    },
    delNote: async (userId, noteId) => {
        try {
            return await User.updateOne(
                { _id: userId },
                {
                    $pull: {
                        notes:
                            { noteId: noteId }
                    }
                }
            );
        }
        catch(err){
            throw err;
        }
    },
    editUserDetails: async (userId,obj)=>{
        try{
            return await User.updateOne(
                {_id:userId},
                {
                    $set:obj
                }
            );
        }
        catch(err){
            throw err;
        }
    },
    changePassword: async (userId,newPassword)=>{
        try{
            return await User.updateOne(
                {_id:userId},
                {
                    $set:{
                        password:newPassword
                    }
                }
            );
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = userService;