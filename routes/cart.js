const express = require('express');
const router = express.Router();
const { isLoggedIn, isBuyer } = require('../middleware');
const Product = require('../models/Product');
const User = require('../models/User');
const { showCart, addToCart, removeFromCart } = require('../controllers/cart');

//Route to see the cart
router.get('/user/cart', isLoggedIn, showCart)

// Actually adding the product to the cart in DB & then redirect to cart page
router.post('/user/:productId/add', isLoggedIn, isBuyer, addToCart)


//Removing a product from the cart in DB & then redirect to cart page
router.delete('/user/:productId/delete', isLoggedIn, isBuyer, removeFromCart)


module.exports = router