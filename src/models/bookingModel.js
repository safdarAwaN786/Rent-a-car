const mongoose = require('mongoose');
const { Schema } = mongoose;


const bookingSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        requied: true
    },
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'vehicle'
    },
    pickUpLocation: {
        type: String,
        required: true
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    pickUpTime: {
        type: String,
        required: true
    },
    dropOffLocation: {
        type: String,
        required: true
    },
    dropOffDate: {
        type: Date,
        requied: true
    },
    dropOffTime: {
        type: String,
        required: true
    },
    addedExtras: {
        type: Array
    },
    promoCode: {
        type: Object
    },
    status : {
        type : String,
        required : true,
        default : 'Not Confirmed',
        enum : ['Not Confirmed', 'Confirmed', 'Completed']
    },
    totalPricePerDay: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    netVatedTotal: {
        type: Number,
        required : true
    },
    bookingDate : {
        type : Date,
        required : true,
        default : new Date()
    },
    vatValue: {
        type : Number,
        required : true
    }

})

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;