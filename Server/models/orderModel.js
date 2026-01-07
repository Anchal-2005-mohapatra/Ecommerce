const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
 title: {               
    type: String,
    required: true,
  },
  image: {               
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    items: [orderItemSchema],

    address: {
      name: String,
      phone: String,
      state: String,
      city: String,
      pincode: String,
      address: String,
      landmark: String,
      alternativePhone: String,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
