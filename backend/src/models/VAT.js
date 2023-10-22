const mongoose = require('mongoose');

const VATS = new mongoose.Schema({
    value : {
        type : Number,
    }
})

const VAT = mongoose.model('VAT', VATS);

module.exports = VAT;