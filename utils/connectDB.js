const {MongoClient}=require('mongodb');

const url="mongodb://localhost:27017/notesApp";

async function connectTodb(){
    try{
        await MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true });
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