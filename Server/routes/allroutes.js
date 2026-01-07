const express = require('express');
const router = express.Router();
const userRoutes = require('../routes/userRoute');
const productRouter= require('../routes/productRoute');
const cartRouter = require('../routes/cartRouter');
const wishlistRouter = require('../routes/wishlistRoute');
const addressRoute = require('../routes/addressRoute');
const orderRouter = require('../routes/orderRoute');

router.use("/users",userRoutes);
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/wishlist', wishlistRouter)
router.use('/address',addressRoute)
router.use('/order', orderRouter);
 module.exports=router;