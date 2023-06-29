const express = require('express');
const {  getProducts, totalProducts, getProductSpecificField, searchItems } = require("../../../controller/products/products");
const productRoutes = express.Router()


productRoutes.get("/totalproducts", totalProducts)
    .get("/getProductSpecificField", getProductSpecificField)
    .get("/products", getProducts)
    .get("/products/search", searchItems)

    // .get("/products/:id", getProductsById)
    // .put("/replaceProducts/:id", updateProduct)
    // .patch("/updateProducts/:id", patchProduct)


module.exports = { productRoutes }