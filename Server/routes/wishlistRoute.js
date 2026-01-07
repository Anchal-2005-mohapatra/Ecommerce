const express = require('express');
const route = express.Router();
const {addToWishlist,getWishlist, removeFromWishlist} =  require('../controllers/wishlistController');
 route.post('/add-wishlist', addToWishlist);
 route.get('/get/:userId', getWishlist);
 route.delete('/remove/:userId/:productId', removeFromWishlist);
 module.exports = route;