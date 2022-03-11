const mongoose = require('mongoose')
const SellScrapSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }, name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const Sell = mongoose.model('SellModel', SellScrapSchema);
module.exports = Sell;

