const Cart = require ('../models/cartModel');
const Product = require("../models/productModel");
const mongoose =  require('mongoose');

async function calculateTotal(items) {
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
}


 exports.addToCart = async(req,res)=>{
    try{
        const {userId, productId, quantity} = req.body;
        console.log("add to cart ", req.body);
         if(!userId || !productId || !quantity){
           return res.status(400).json({ message: "userId, productId, and quantity are required" });
          }

             if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid userId or productId" });
    }

    
    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Quantity must be a positive number" });
    }

         const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{ productId, quantity:qty }],
                totalPrice: product.price * qty
            });
        } else {
            const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId .toString());

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += qty;
            } else {
                cart.items.push({ productId, quantity:qty });
            }

             cart.totalPrice = await calculateTotal(cart.items);
    }

        await cart.save();
        const updatedCart = await Cart.findOne({ userId }).populate("items.productId", "name price description imgUrl");
    return res.status(200).json({ message: "Product added to cart successfully", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getCartById = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.userId }).populate(
      'items.productId',
      "name price description imgUrl rating reviewCount"
    );

    if (!cart) {
      // Return an empty cart if none exists
      cart = { items: [], totalPrice: 0 };
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// exports.getCart = async (req, res) => {
//   try {
//     const carts = await Cart.find({}).populate('items.productId', 'name price');
//     res.status(200).json(carts)
//   }
//   catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// }

exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;
    if(!userId || !productId || !action) {
            return res.status(400).json({ message: "userId, productId and action are required" });
 
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
 const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

  
    if (action === "inc") {
      cart.items[itemIndex].quantity += 1;
    }

  
    if (action === "dec") {
      if (cart.items[itemIndex].quantity === 1) {
        // remove item if quantity becomes 0
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity -= 1;
      }
    }

  
    cart.totalPrice = await calculateTotal(cart.items);

    await cart.save();
     const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price description imgUrl rating reviewCount"
    );


    return res.status(200).json({
      message: "Cart updated successfully",
      cart:updatedCart
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId) {
      res.status(400).json({ message: "the userId and ProductId required" })
    }
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
    cart.totalPrice = await calculateTotal(cart.items)
    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate("items.productId", "name price imgUrl reviewCount rating ")
    res.json(updatedCart);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.removeItemId = async (req, res) => {
//   try {
//     const { userId, productId, quantity } = req.body;
//     const qyt = quantity ? parseInt(quantity) : 1;
  
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const itemIndex = cart.items.findIndex((i) => i.productId.toString() === productId);

//     if (itemIndex === -1) return res.status(404).json({ message: "Item not found in cart" });


//     if (cart.items[itemIndex].quantity <= qyt) {
//       cart.items.splice(itemIndex, 1);
//     }
//     else {
//       cart.items[itemIndex].quantity -= qyt;
//     }
//     cart.totalPrice = await calculateTotal(cart.items);
//     await cart.save();
//     const updatedCart = await Cart.findOne({ userId }).populate("items.productId", "name price")
//    return res.status(200).json(updatedCart);

//   }
//   catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }

// exports.remove=async(req,res)=>{
//   try{
//     const {id}=req.params;
//     const removed = await Cart.findByIdAndDelete(id);
//     if(!removed){  
//       res.status(404).json({message:"Cart not found"});
//     }
//     return res.status(200).json({message:"Cart removed successfully"});  
//   } 
//   catch(err){
//     res.status(500).json({message:err.message});
//   } 
// };