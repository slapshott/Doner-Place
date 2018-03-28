const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    creator: { type: String, required: true },
    product: { type: String, required: true },
    date: { type: Date, default: Date.now() },
    toppings: [{ type: String }],
    status: { type: String, default: 'Pending' },
    size: {type: String, required: true}
})

module.exports = mongoose.model('Order', orderSchema);