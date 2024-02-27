const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview, isBuyer, isLoggedIn, isReviewAuthor} = require('../middleware');
const { addNewReview, editReviewForm, editReview, deleteReview } = require('../controllers/review');

//To actually add a review in database
router.post('/products/:id/review', validateReview, isLoggedIn, isBuyer,  addNewReview)


//To show editing form of a particular review
router.get('/products/:productId/review/:reviewId/edit', isLoggedIn, editReviewForm)

//To edit a particular review in the database
router.patch('/products/:productId/review/:reviewId', validateReview, isLoggedIn, isReviewAuthor,  editReview)


//To delete a particular review by a particular buyer
router.delete('/products/:productId/review/:reviewId', isLoggedIn, isReviewAuthor, deleteReview) 


module.exports = router;