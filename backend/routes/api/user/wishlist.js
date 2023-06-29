const express = require('express');
const { getWishlist, check, addToWishlist, deleteOneFromWishlist, deleteAllFromWishlist } = require('../../../controller/users/wishlist');

const WishlistRoutes = express.Router()


WishlistRoutes.get('/getWishlist', check, getWishlist)
    .post('/addToWishlist', check, addToWishlist)
    .delete('/deleteOneFromWishlist', check, deleteOneFromWishlist)
    .delete('/deleteAllFromWishlist', check, deleteAllFromWishlist)



module.exports = { WishlistRoutes }