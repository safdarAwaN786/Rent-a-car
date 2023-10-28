const mongoose = require('mongoose');

const extrasSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        unique : true
    },

    extrasAdded: [
        {
            extraName: {
                type: String,
                
            },
            maxQuantity: {
                type: Number,
                
            },
            priceOfExtra: {
                type: Number,
                
            }

        }
    ],
    
});

const Extra = mongoose.model('extra', extrasSchema);

module.exports = Extra;
