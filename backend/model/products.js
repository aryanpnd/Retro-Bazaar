const mongoose = require('mongoose');
const { Schema } = mongoose;
//Defining DB Schema and Model---------------------------------------------------
const productSchema = new Schema({
    title: { type: String, required: [true, "please enter valid title"], unique: [true, "Item with this name already exists"] },
    description: String,
    price: { type: Number, min: 1, required: [true, "please enter valid price"] },
    discountPercentage: { type: Number, min: 1, max: 50 },
    rating: { type: Number, min: 1, max: 5 },
    stock: { type: Number, min: 1, required: true },
    brand: { type: String, required: true },
    catagory: { type: String, required: true },
    thumbnail: String,
    images: [String]
});

// defining model **remember, model first argument will be your collection name and always should be in first letter capital and in singular form for instance:- if my collection name is "meows" than the argument should be "Meow" or "cats" as "Cat"
const Product = mongoose.model('Product', productSchema);
// -------------------------------------------------------------------------

module.exports = { productSchema, Product }