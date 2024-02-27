const {productSchema, reviewSchema} = require('./schema');
const Product = require('./models/Product');
const Review = require('./models/Review');

//validateProduct & validateReview are the middlewares we are making here.
const validateProduct = (req,res,next) => {
    const {name, img, price, desc} = req.body;
    const {error} = productSchema.validate({name, img, price, desc});
    if(error) {
        return res.render('error.ejs', {err: error});
    }

    next();
};

const validateReview = (req,res,next) => {
    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating, comment});
    if(error) {
        return res.render('error.ejs', {err: error});
    }

    next();
};

const isLoggedIn = (req, res, next) => {

    // The req.xhr property returns a true value if the request’s X-Requested-With header field is XMLHttpRequest which indicates that the request was issued by a client library such as jQuery. 
    // We are doing this check bcoz we have used it in axios (wishList.js)
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'});
    }

    if(!req.isAuthenticated()) {
        req.flash('errorMsg', "Please login first !!")
        return res.redirect('/login')
    }
    next();
};

const isSeller = (req, res, next) => {
    if(!req.user.role || req.user.role !== 'seller'){
        req.flash('errorMsg', "You don't have the permission to do that!")
        return res.redirect('/products')
    }
    next();
}

const isBuyer = (req, res, next) => {
    if(!req.user.role || req.user.role !== 'buyer'){
        req.flash('errorMsg', "You don't have the permission to do that!")
        return res.redirect('/products')
    }
    next();
}

const isProductAuthor = async (req, res, next) => {
    let {id} = req.params;
    let product = await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('errorMsg', "You are not the authorized user to perform operations on this product!")
        return res.redirect('/products')
    }
    next();
}


const isReviewAuthor = async(req, res, next) => {
    let {reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(req.user._id)){
        req.flash('errorMsg', "You don't have permission to do that!");
        return res.redirect('/products');
    }
    next();
}

module.exports = {validateProduct, validateReview, isLoggedIn, isSeller, isBuyer, isProductAuthor, isReviewAuthor};