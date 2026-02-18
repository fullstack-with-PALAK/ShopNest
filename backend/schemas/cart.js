const mongoose = require('mongoose');
const { productSchema } = require('./products');

const cartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    cartItem: [productSchema]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
