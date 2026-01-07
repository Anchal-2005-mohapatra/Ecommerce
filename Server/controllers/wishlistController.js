const Wishlist = require('../models/wishlistModel');
const Product = require('../models/productModel');
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        let wishlist = await Wishlist.findOne({ userId }).populate('products');
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [productId] });
            await wishlist.save();
            return res.status(200).json({ message: "Product was added sucessfully", wishlist })
        }
        const alreadyExist = wishlist.products.some(
            (id) => id.toString() === productId
        );
        if (alreadyExist) {
            return res.status(400).json({ message: "This Product is already in wishlist" });
        }
        wishlist.products.push(productId);
        await wishlist.save();

        return res.status(200).json({ message: "product added to wishlist", wishlist });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.params.userId }).populate('products');
        if (!wishlist) {
            // Return empty array instead of 404
            return res.status(200).json({ products: [] });
        }
        res.status(200).json({ products: wishlist.products });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({ message: "User ID and Product ID required" });
        }
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }
        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
        await wishlist.save();
        return res.status(200).json({ message: "Product removed from wishlist", wishlist });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};  