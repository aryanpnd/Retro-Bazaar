const express = require('express');
const { check, getWishlist, addToWishlist, deleteOneFromWishlist,deleteAllFromWishlist } = require("../../../controller/wishlist")

const WishlistRoutes = express.Router()


WishlistRoutes.get('/getWishlist', check, getWishlist)
    .post('/addToWishlist', check, addToWishlist)
    .delete('/deleteOneFromWishlist', check, deleteOneFromWishlist)
    .delete('/deleteAllFromWishlist', check, deleteAllFromWishlist)



module.exports = { WishlistRoutes }