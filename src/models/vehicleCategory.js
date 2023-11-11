const mongoose = require('mongoose');

const vehicleCategorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        required : true
    }
})

const vehicleCategory = mongoose.model('category', vehicleCategorySchema);

module.exports = vehicleCategory;