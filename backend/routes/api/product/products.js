const express = require("express");
const {
  getProducts,
  totalProducts,
  getProductSpecificField,
  searchItems,
  getSingleProduct,
} = require("../../../controller/products/products");
const productRoutes = express.Router();

productRoutes
  .get("/totalproducts", totalProducts)
  .get("/getProductSpecificField", getProductSpecificField)
  .get("/products", getProducts)
  .get("/products/search", searchItems)
  .get("/productdetails", getSingleProduct);

module.exports = { productRoutes };
