const express = require('express');
const { productRoutes } = require('./product/products');
const { UserRoutes } = require('./user/users');
const { WishlistRoutes } = require('./user/wishlist');

const allApiRoutes = express.Router()

allApiRoutes.use('/',
    productRoutes, UserRoutes,WishlistRoutes
)

module.exports = { allApiRoutes }