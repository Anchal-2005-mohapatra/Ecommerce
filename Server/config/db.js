require('dotenv').config();
const mongoose = require('mongoose');
const connectDb=async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("the database Connected : ", `${connect.connection.host}`)
    }
    catch(err){
        console.log({message: err.message});
    }
}
module.exports=connectDb