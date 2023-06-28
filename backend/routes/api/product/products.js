const express = require('express');
const { addProduct, getProducts, totalProducts, getProductSpecificField, searchItems } = require("../../../controller/products");
const { devInsertMany } = require('./productsDEV');
const productRoutes = express.Router()


productRoutes.get("/totalproducts", totalProducts)
    .get("/getProductSpecificField", getProductSpecificField)
    .get("/products", getProducts)
    .get("/products/search", searchItems)
    .post("/addproduct", addProduct)
    // .get("/products/:id", getProductsById)
    // .put("/replaceProducts/:id", updateProduct)
    // .patch("/updateProducts/:id", patchProduct)
    // .delete("/deleteProducts/:id", deleteProduct)
    .post("/dev/devInsertMany", devInsertMany)


module.exports = { productRoutes }