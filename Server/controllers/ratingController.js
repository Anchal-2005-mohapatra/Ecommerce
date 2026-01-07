const Rating = require("../models/ratingModel");
const Product = require("../models/productModel");


exports.addOrUpdateRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const productId = req.params.productId;
    const userId = req.user._id;

   
    const product = await Product.findOne({
      _id: productId,
      buyer: userId,
      orderStatus: "purchased"
    });

    if (!product) {
      return res.status(403).json({
        message: "You must purchase the product before rating it"
      });
    }

    const existingRating = await Rating.findOne({
      product: productId,
      user: userId
    });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();
    } else {
      await Rating.create({
        product: productId,
        user: userId,
        rating,
        review
      });
    }

    
    const stats = await Rating.aggregate([
      { $match: { product: product._id } },
      {
        $group: {
          _id: "$product",
          avgRating: { $avg: "$rating" },
          ratingCount: { $sum: 1 }
        }
      }
    ]);

    await Product.findByIdAndUpdate(productId, {
      avgRating: stats[0]?.avgRating || 0,
      ratingCount: stats[0]?.ratingCount || 0
    });

    res.status(200).json({ message: "Rating saved successfully" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getRatingsByProduct = async (req, res) => {
  try {
    const ratings = await Rating.find({
      product: req.params.productId
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(ratings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
