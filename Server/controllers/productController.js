const Product = require('../models/productModel');
const User = require('../models/userModel');
const Rating = require('../models/ratingModel');

exports.createProduct = async (req, res) => {
    console.log("the product", req.body);
    try {
         const { category } = req.body;

    
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
        const user = await User.findById(req.body.seller);
        if (user.role === "seller" && user.sellerStatus !== "approved") {
            return res.status(403).json({ message: "seller not approve by admin" })
        }

        let mainImage = "";
        let multipleImages = [];

        if (req.files && req.files.mainImage) {
            mainImage = req.files.mainImage[0].path;
        }
        else if (req.body.imgUrl) {
            mainImage = req.body.imgUrl;
        }

        if (req.files && req.files.images) {
            multipleImages = req.files.images.map(file => file.path);
        }
        else if (req.body.images) {
            multipleImages = req.body.images;
        }

        const product = new Product({
            ...req.body,
            category: category.toLowerCase(),
             imgUrl: mainImage,
            images: multipleImages
        });
        await product.save();
        return res.status(201).json({ message: "the product was created succesfully", product })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: err.message })
    }
}
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category.toLowerCase();
    }

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.reviews = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        const rating = await Rating.findById(productId);
        return res.status(200).json({ product, rating })
    }
    catch (err) {
        return res.status(400).Json({ message: err.message })
    }
}

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.category) {
      updateData.category = updateData.category.toLowerCase();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      message: "Your product was updated successfully",
      product: updatedProduct
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "the product was deleted successfully" })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}

exports.PurchesProduct = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.params);
        const buy = await Product.findByIdAndUpdate(req.params.id,
            {
                buyer: req.body.buyerId, orderStatus: "purchased"
            }, { new: true }
        );

        res.status(200).json({ message: "your order was placed succssed", data: buy })
    }
    catch (err) {
        res.json({ message: err.message })
    }
};

exports.returnProduct = async (req, res) => {
    try {
        const returnPd = await Product.findByIdAndUpdate(req.params.id, {
            orderStatus: "returned"
        }, { new: true });
        res.json({ message: "the produt was return succesfully", returnPd })
    }
    catch (err) {
        res.json({ message: err.message })
    }
}