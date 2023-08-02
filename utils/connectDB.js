const mongoose= require("mongoose");

const url="mongodb://127.0.0.1:27017/notesApp";

async function connectTodb(){
    try{
        await mongoose.connect(url,{ useNewUrlParser:true, useUnifiedTopology: true});
        console.log("db connected");
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports={
    connectTodb
}