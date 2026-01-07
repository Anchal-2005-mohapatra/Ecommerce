const mongoose= require('mongoose');
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true
},
password:{
    type:String,
    required:true
},
role:{
    type:String,
    enum:["admin","seller","buyer"],
    default:"buyer"
},
sellerStatus:{
    type:String,
    enum:["pending","approved","rejected"],
    default:"pending"
},
 isActive: {
    type: Boolean,
    default: true,
  },
});
module.exports= mongoose.model("User", userSchema);