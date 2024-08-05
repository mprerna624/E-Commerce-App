const mongoose = require('mongoose');

const Product = require('./models/Product');


const products = [
    {
        name: "iPhone 14 Pro Max",
        img: "https://images.unsplash.com/photo-1697898706719-bce6e007c817?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBob25lJTIwMTR8ZW58MHx8MHx8fDA%3D",
        price: 130000,
        desc: "Apple's flagship smartphone with a 6.7-inch display, A16 Bionic chip, and a 48MP Pro camera system" 
    },
    {
        name: "MacBook M2 Pro",
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        price: 250000,
        desc: "Apple's high-performance laptop featuring a powerful M2 processor, upto 20 hrs battery life, and a stunning Retina display"
    },
    {
        name: "iWatch",
        img: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
        price: 51000,
        desc: "Apple's versatile smartwatch with health tracking, fitness features, and seamless integration with iOS devices"
    },
    {
        name: "iPad Pro",
        img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
        price: 237900,
        desc: "Apple's tablet featuring a Liquid Retina display, M1 chip, and support for Apple Pencil and Magic Keyboard"
    },
    {
        name: "Airpodes",
        img: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D",
        price: 25000,
        desc: "Apple's wireless earbuds with high-quality audio, seamless device pairing, and active noise cancellation"
    },
]



async function seedDB() {
    await Product.insertMany(products); //all these DB methods returns a promise that's why async-await
    console.log("Data seeded successfully !!")
}


module.exports = seedDB;