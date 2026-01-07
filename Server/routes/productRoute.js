const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { createProduct, updateProduct, deleteProduct, PurchesProduct, returnProduct, getAllProducts, getProductById } = require("../controllers/productController");


router.post("/create", upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: "images", maxCount: 10 }
]), createProduct);
router.get('/get', getAllProducts);
router.get('/get/:id', getProductById)
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/buy/:id', PurchesProduct);
router.put('/return/:id', returnProduct)
module.exports = router;