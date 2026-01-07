const express = require("express");
const router = express.Router();
const {
  addOrUpdateRating,
  getRatingsByProduct
} = require("../controllers/ratingController");

const auth = require("../middleware/authMiddleware");

router.post("/:productId", auth, addOrUpdateRating);

router.get("/:productId", getRatingsByProduct);

module.exports = router;
