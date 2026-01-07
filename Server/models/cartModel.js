const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
    default: 1
  }
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true 
    },
    items: {
      type: [cartItemSchema],
      default: []
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
