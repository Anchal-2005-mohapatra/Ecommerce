const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  imgUrl: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    default: []
  },
  name: {
    type: String
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String
  },
   category: {
    type: String,
    required: true,
    enum: ["men", "women", "kids", "beauty", "trends"],
    lowercase: true
  },
    rating:{
      type:Number,
      default:0,
    },
  reviewCount:{
    type:Number,
    default:0,
  },
  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    },
  ],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  orderStatus: {
    type: String,
    enum: ["none", "purchased", "delivered", "returned"],
    default: "none"
  }
});
module.exports = mongoose.model("Product", productSchema)