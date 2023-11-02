const mongoose =  require('mongoose')

const promoCodeSchema = new mongoose.Schema({
    code : {
        type : String,
        required : true,
        unique : true
    },
    discountPercent : {
        type : Number,
        required : true
    }
})

const promoCode = new mongoose.model('promoCode', promoCodeSchema);
module.exports =  promoCode;