const express = require('express');
const router = express.Router(); //mini-instance of our application
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProduct, isLoggedIn, isSeller, isProductAuthor} = require('../middleware');
const { showAllProducts, newProductForm, addNewProduct, showParticularProduct, editProductForm, editProduct, deleteProduct } = require('../controllers/product');

//For routes - Restful Routing Convention(just like Blogs Project)

//To show all the products
router.get('/products', showAllProducts)

//To show the form for adding a new product
router.get('/product/new', isLoggedIn, newProductForm);

//To actually add the product in the DB then redirect
router.post('/products', validateProduct, isLoggedIn, isSeller, addNewProduct);

//To show a particular product page
router.get('/products/:id', isLoggedIn, showParticularProduct);

//To shown an edit form for a particular product
router.get('/products/:id/edit', isLoggedIn, editProductForm);

//To actually edit the product in the DB then redirect
router.patch('/products/:id', validateProduct, isLoggedIn, isProductAuthor, editProduct);

//To delete a particular product then redirect
router.delete('/products/:id', isLoggedIn, isProductAuthor, deleteProduct)


module.exports = router;