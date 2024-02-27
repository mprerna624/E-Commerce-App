const mongoose = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    img: {
        type: String, //url string
        trim: true,
        // default: ,
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    desc: {     //description
        type: String,
        trim: true
    }, 
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' //ref=reference - name of model jisko refer krna hai ObjectId konse model(~ collection in db) se uthani hai 
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avgRating: {
        type: Number,
        default: 0
    }
})

//Production Way to delete reviews of a particular product from the Review Collection in DB when a product gets deleted.
productSchema.post('findOneAndDelete', async function(product){
    if(product.reviews.length > 0) {
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
})


let Product = mongoose.model('Product', productSchema);

module.exports = Product;