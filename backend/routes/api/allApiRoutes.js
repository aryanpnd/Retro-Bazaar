const express = require('express');
const { productRoutes } = require('./product/products');
const { UserRoutes } = require('./user/users');
const { WishlistRoutes } = require('./user/wishlist');

const protectedApiRoutes = express.Router()
const unprotectedApiRoutes = express.Router()

protectedApiRoutes.use('/',
    UserRoutes,WishlistRoutes
)
unprotectedApiRoutes.use('/',
    productRoutes
)

module.exports = { protectedApiRoutes,unprotectedApiRoutes }