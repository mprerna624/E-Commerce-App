const Product = require("../models/Product");
const Review = require("../models/Review");

//To actually add a review in database
const addNewReview = async(req,res) => {
    try{
        let {id} = req.params;
        let {rating, comment} = req.body;
        const product = await Product.findById(id);
        const review = new Review({rating, comment, author: req.user._id}); 
        //Why Class syntax(new)? - Bcoz Model is a JS Class 

        // Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) + parseInt(rating)) / (product.reviews.length + 1);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));
        
        product.reviews.push(review); //Product model mein reviews array mein push kia hai
        await review.save(); //DB mein save kia hai - Review Model
        await product.save(); //DB mein save kia hai - Product Model
        
        req.flash('successMsg', "Review added successfully !!")
        res.redirect(`/products/${id}`)
    }
    catch(e){
        console.log(`ERROR--> ${e}`)
        res.status(500).render('error.ejs', {err: e.message});
    }
}


//To show editing form of a particular review
const editReviewForm = async(req, res) => {
    try {
        let {productId, reviewId} = req.params;
        let review = await Review.findById(reviewId);
        res.render('reviews/edit', {productId, review});
    }
    catch(e) {
        res.status(500).render('error.ejs', {err: e.message});
    }
}


//To edit a particular review in the database
const editReview = async(req, res) => {
    try {
        let {productId, reviewId} = req.params;
        let {rating, comment} = req.body;
        let product = await Product.findById(productId);
        let review = await Review.findById(reviewId);
                
        // Average Rating Logic
        const newAverageRating = ((product.avgRating * product.reviews.length) - review.rating + parseInt(rating) ) / (product.reviews.length);
        product.avgRating = parseFloat(newAverageRating.toFixed(1));
        
        await Review.findByIdAndUpdate(reviewId, {rating, comment});
        await product.save();

        req.flash('successMsg', "Review edited successfully!!");
        res.redirect(`/products/${productId}`)
    }
    catch(e) {
        res.status(500).render('error.ejs', {err: e.message});
    }
}


//To delete a particular review by a particular buyer
const deleteReview = async(req, res) => {
    try{
        let {productId, reviewId} = req.params;
        let product = await Product.findById(productId);
        let review = await Review.findById(reviewId);
        
        // Average Rating Logic
        let newAverageRating = ((product.avgRating * product.reviews.length) - review.rating) / (product.reviews.length - 1);
        //In case every review gets deleted and product.reviews.length - 1 = 0
        if(newAverageRating === Infinity) {newAverageRating = 0}

        product.avgRating = parseFloat(newAverageRating.toFixed(1));

        product.reviews = product.reviews.filter( (rId) => !rId.equals(reviewId) );
        await product.save();
        await Review.findByIdAndDelete(reviewId);

        req.flash('successMsg', "Review deleted successfully!")
        res.redirect(`/products/${productId}`)
    }
    catch(e) {
        res.status(500).render('error.ejs', {err: e.message})
    }
}


module.exports = {addNewReview, editReviewForm, editReview, deleteReview}