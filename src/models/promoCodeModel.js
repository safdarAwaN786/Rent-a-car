const mongoose = require('mongoose')

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    discountPercent: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Groups : {
        type : Array,
    }
})

const PromoCode = new mongoose.model('promoCode', promoCodeSchema);
module.exports = PromoCode;