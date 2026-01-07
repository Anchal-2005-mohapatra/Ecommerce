const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Address = require("../models/addressModel");
const Product = require("../models/productModel");

exports.createOrder = async (req, res) => {
  try {
    const { userId, addressId, paymentMethod, source, product } = req.body;

    const addressDoc = await Address.findOne({ _id: addressId, userId });
    if (!addressDoc) {
      return res.status(400).json({ message: "Address not found" });
    }

    let items = [];

    if (source === "CART") {
      const cart = await Cart.findOne({ userId }).populate("items.productId");

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

      items = cart.items.map(i => ({
        productId: i.productId._id,
        title: i.productId.name,
        image: i.productId.imgUrl || i.productId.images?.[0] || "",
        price: i.productId.price,
        quantity: i.quantity,
      }));

      cart.items = [];
      await cart.save();
    }

    if (source === "BUY_NOW") {
      if (!product?.productId) {
        return res.status(400).json({ message: "Product data missing" });
      }

      const dbProduct = await Product.findById(product.productId);
      if (!dbProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      items = [
        {
          productId: dbProduct._id,
          title: dbProduct.name,
          image: dbProduct.imgUrl || dbProduct.images?.[0] || "",
          price: dbProduct.price,
          quantity: product.quantity || 1,
        },
      ];
    }

    const totalAmount = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const order = await Order.create({
      userId,
      items,
      address: {
        name: addressDoc.name,
        phone: addressDoc.phone,
        address: addressDoc.address,
        city: addressDoc.city,
        state: addressDoc.state,
        pincode: addressDoc.pincode,
        landmark: addressDoc.landmark || "",
      },
      paymentMethod,
      totalAmount,
      status: "PLACED",
    });

    res.status(201).json(order);

  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed", error: err.message });
  }
};



exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};


exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch order" });
    }
};


exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Order status updated",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status" });
    }
};


exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status !== "PLACED") {
            return res
                .status(400)
                .json({ message: "Order cannot be cancelled" });
        }

        order.status = "CANCELLED";
        await order.save();

        res.status(200).json({
            message: "Order cancelled successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to cancel order" });
    }
};
