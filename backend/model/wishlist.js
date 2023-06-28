const mongoose = require('mongoose');
const { Schema } = mongoose;

const WishlistSchema = new Schema({
    uid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    user:{
        type:String
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);
// -------------------------------------------------------------------------

module.exports = { Wishlist }