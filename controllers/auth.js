const User = require('../models/User');


//To show the Sign-up form
const showSignUpForm = (req,res) => {
    res.render('auth/signup');
}


//Actually want to register a user in DB
const registerUser = async(req,res) => {
    try{
        let {email, password, username, role} = req.body;
        const user = new User({email, username, role});
        const newUser = await User.register(user, password);
        // res.redirect('/login')
        req.login(newUser, function(err) {
            if(err){
                return next(err)
            }
            req.flash('successMsg', "Welcome! You have registered successfully!");
            return res.redirect('/products')
        })
    }
    catch(e){
        req.flash('errorMsg', e.message);
        return res.redirect('/register');
    }
}


//To show the Login form
const showLoginForm = (req,res) => {
    res.render('auth/login');
}


//To actually login via the DB
const loginUser = (req,res) => {
        req.flash('successMsg', `Welcome Back, ${req.user.username} !!`);
        res.redirect('/products');
}


//To logout the user and redirect to login page
const logoutUser = (req,res) => {
    // logout method always works inside a cb fn that's why we made an arrow cb fn
    req.logout( () => {
        req.flash('successMsg', 'You have logged out successfully.');
        res.redirect('/login');
    }); 
}


module.exports = {showSignUpForm, registerUser, showLoginForm, loginUser, logoutUser}