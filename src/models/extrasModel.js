const mongoose = require('mongoose');

const extrasSchema = new mongoose.Schema({
   

    Extras: [
        {
            extraName: {
                type: String,
                
            },
            maxQuantity: {
                type: Number,
                required : true,
                default : 1
                
            },
            priceOfExtra : {},

        }
    ],
    
});

const Extra = mongoose.model('extra', extrasSchema);

module.exports = Extra;
