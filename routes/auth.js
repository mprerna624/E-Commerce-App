const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
const { showSignUpForm, registerUser, showLoginForm, loginUser, logoutUser } = require('../controllers/auth');

//To show the Sign-up form
router.get('/register', showSignUpForm);

//Actually want to register a user in DB
router.post('/register', registerUser);


//To show the Login form
router.get('/login', showLoginForm);


//To actually login via the DB
router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureMessage: true
    }),
    loginUser);


//To logout the user and redirect to login page
router.get('/logout', logoutUser)


module.exports = router;