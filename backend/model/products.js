const mongoose = require('mongoose');
const { Schema } = mongoose;


const productSchema = new Schema({
    title: { type: String, required: [true, "please enter valid title"] },
    description: String,
    price: { type: Number, min: 1, required: [true, "please enter valid price"] },
    quantity: { type: Number, min: 1, required: [true, "Quantity required"] },
    brand: { type: String },
    thumbnail: { type: String, required: [true, 'Thumbnail of product is required'] },
    images: [{ type: String, required: [true, 'Images of product is required'] }],
    imagesPublicId:[{ type: String, required: [true, 'Image public id of product is required'] }],
    category: { type: String, required: true },
    location:{ type: String, required: [true, 'Location of product is required'] },
    date: { type: Date, default: Date.now },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);


module.exports = { productSchema, Product }