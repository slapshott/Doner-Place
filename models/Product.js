const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
    size: { type: Number, min: 5, max: 50 },
    toppings: [{ type: String }]
})

module.exports = mongoose.model('Product', productSchema);