const express = require('express');
const router = express.Router();
let {isLoggedIn} = require('../../middleware')
const User = require('../../models/User');

router.post('/product/:productId/like' , isLoggedIn , async(req,res)=>{
    let {productId} = req.params;
    let user = req.user;
    let isLiked = user.wishList.includes(productId);
    // console.log('api')

    // The $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    // The $addToSet operator adds a value to an array unless the value is already present, in which case $addToSet  does nothing to that array.

    // if(isLiked){
    //     User.findByIdAndUpdate(req.user._id , {$pull:{wishList:productId}})
    // }else{
    //     User.findByIdAndUpdate(req.user._id , {$addToSet:{wishList:productId}})
    // }

    // By default, findByIdAndUpdate() returns the document as it was before update was applied. If you set new: true, findByIdAndUpdate() will instead give you the object after update was applied.
    //The below code can be done by if else as well   
    const option = isLiked? '$pull' : '$addToSet';
    req.user = await User.findByIdAndUpdate(req.user._id , {[option]:{wishList:productId}} , {new:true} )
    res.send('like done api');
})


module.exports = router;