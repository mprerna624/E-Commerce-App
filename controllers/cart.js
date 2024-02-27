const Product = require("../models/Product");
const User = require("../models/User");

//Route to see the cart
const showCart = async(req, res) => {
    let userId = req.user._id;
    let user = await User.findById(userId).populate('cart');
    let totalAmount = user.cart.reduce((sum, curr) => sum+curr.price, 0);
    res.render('cart/cart.ejs', {user, totalAmount});
}


// Actually adding the product to the cart in DB & then redirect to cart page
const addToCart = async (req, res) => {
    let {productId} = req.params;
    let currentUserId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(currentUserId);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart')
}


//Removing a product from the cart in DB & then redirect to cart page
const removeFromCart = async(req, res) => {
    let {productId} = req.params;
    let userId = req.user._id;
    let user = await User.findById(userId);
    user.cart = user.cart.filter((item) => !item.equals(productId));
    await user.save();
    res.redirect('/user/cart');
}


module.exports = {showCart, addToCart, removeFromCart}