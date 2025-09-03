const mongoose= require("mongoose");

const noteSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true
    },
    noteTitle:{
        type:String,
        required:true,
        unique:false
    },
    noteContent:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const note=mongoose.model("Note",noteSchema);
module.exports=note;