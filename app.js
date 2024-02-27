if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB = require('./seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User')


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApiRoutes = require('./routes/api/productapi');


const dbURL = process.env.dbURL;
const port = process.env.PORT;


// mongoose.set('strictQuery', true);
mongoose.connect(dbURL)
.then(() => {
    console.log("Database connected successfully !!")
})
.catch( (err) => {
    console.log("Something went wrong !");
    console.log(err)
})


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 24*7*60*60*1000,
        maxAge: 24*7*60*60*1000
    }
}));
app.use(flash());

//PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    res.locals.successMsg = req.flash('successMsg');
    res.locals.errorMsg = req.flash('errorMsg');
    next();
})


//Seeding Database - (kyunki nodemon baar baar app.js chalata rehta hai toh seedDB fn baar baar chalne ke kaaran baar baar seed hota rahega mtlb DB mein duplicated entries hoti rahegi --> Soln: ek baar run kro phir comment krdo ye line ) 
// seedDB();

//So that harr incoming request pr chalein - basically app instance se router wala mini-instance chala rahe hein 
app.use(productRoutes); 
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(productApiRoutes);


app.get('/', (req, res) => {
    res.render('home')
})

app.listen(8080, () => {
    console.log(`Server connected at port ${port} !!`)
})