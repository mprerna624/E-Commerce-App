const Product = require('../models/Product');

//To show all the products
const showAllProducts = async (req,res) => {
    try {
        let products = await Product.find({}); //Bcoz all mongoose methods returns promise
        res.render('./products/index', {products});
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
}

//To show the form for adding a new product
const newProductForm = (req,res) => {
    try{
        res.render('./products/new')
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
}

//To actually add the product in the DB then redirect
const addNewProduct = async (req,res) => {
    try{
        let {name, img, price, desc} = req.body;
        await Product.create({name, img, price, desc, author: req.user._id});
        req.flash('successMsg', "Product added successfully!!")
        res.redirect('/products');
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
}

//To show a particular product page
const showParticularProduct = async (req,res) => {
    try{
        let {id} = req.params;
        let foundProductObj = await Product.findById(id).populate('reviews');  //Here reviews is Product model mein jo reviews array bnaya hai
        res.render('products/show', {foundProductObj})
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
} 

//To show an edit form for a particular product
const editProductForm = async (req,res) => {
    try{
        let {id} = req.params;
        let foundProductObj = await Product.findById(id);
        res.render('products/edit', {foundProductObj})
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
}

//To actually edit the product in the DB then redirect
const editProduct = async (req,res) => {
    try{
        let {id} = req.params;
        let {name, img, price, desc} = req.body;
        await Product.findByIdAndUpdate(id, {name, img, price, desc});
        req.flash('successMsg', "Product edited successfully!!")
        res.redirect(`/products/${id}`);
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
}

//To delete a particular product then redirect
const deleteProduct = async (req,res) => {
    try {
        let {id} = req.params;
    
        //If a product gets deleted then its correspnding reviews from the Review Collection in DB should be deleted too 
        // Following commented code is an easy way to do it but not the ideal way.You can see the production way (ideal way) in models>Product.js
        // const product = await Product.findByIdAndDelete(id);
        // for(let reviewId of product.reviews) {
        //     await Review.findByIdAndDelete(reviewId);
        // }
    
        await Product.findByIdAndDelete(id);
        req.flash('successMsg', "Product deleted successfully!!")
        res.redirect('/products');
    }
    catch(e) {
        res.status(500).render('error.ejs', {err : e.message});
    }
}



module.exports = {showAllProducts, newProductForm, addNewProduct, showParticularProduct, editProductForm, editProduct, deleteProduct}