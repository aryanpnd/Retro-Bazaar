const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({
    thumbnail: { type: String, required: [true, 'Thumbnail of product is required'] },
    images: [String],
    title: { type: String, required: [true, "please enter valid title"] },
    description: String,
    price: { type: Number, min: 1, required: [true, "please enter valid price"] },
    quantity: { type: Number, min: 1, required: [true, "Quantity required"] },
    brand: { type: String },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);


module.exports = { productSchema, Product }