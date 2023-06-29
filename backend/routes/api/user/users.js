const express = require('express');
const { getUserInfo, signOutUser } = require('../../../controller/users/users');
const { getUserProducts,addProduct, deleteProduct, deleteAllProducts } = require('../../../controller/users/userProducts');

const UserRoutes = express.Router()


UserRoutes
    .get("/getUserInfo", getUserInfo)
    .get("/getUserProducts", getUserProducts)
    .post("/addproduct", addProduct)
    .delete("/deleteProduct", deleteProduct)
    .delete("/deleteAllProducts", deleteAllProducts)
    .get("/signOutUser", signOutUser)


module.exports = { UserRoutes, signOutUser }