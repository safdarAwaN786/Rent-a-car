const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
   vehicleName: {
      type: String,
      required: true
   },
   engineSize: {
      type: String,
      required: true
   },
   adults: {
      type: Number,
      required: true
   },
   doors: {
      type: Number,
      required: true
   },
   children: {
      type: Number,
      required: true
   },
   seats: {
      type: Number,
      required: true
   },
   bigLuggage: {
      type: String,
      required: true
   },
   smallLuggage: {
      type: String,
      required: true
   },
   transmissionType: {
      type: String,
      enum: ['Manual', 'Automatic']
   },


   winterPrices: {
      '1to2daysPrice': {
         type: Number,
         default: 20
      },
      '3to6daysPrice': {
         type: Number,
         default: 60
      },
      '7to14daysPrice': {
         type: Number,
         default: 140
      },
      '15plusDaysPrice': {
         type: Number,
         default: 280
      },
   },
   summerPrices: {
      '1to2daysPrice': {
         type: Number,
         default: 10
      },
      '3to6daysPrice': {
         type: Number,
         default: 30
      },
      '7to14daysPrice': {
         type: Number,
         default: 70
      },
      '15plusDaysPrice': {
         type: Number,
         default: 150
      },
   },
   summerHighPrices: {
      '1to2daysPrice': {
         type: Number,
         default: 120
      },
      '3to6daysPrice': {
         type: Number,
         default: 360
      },
      '7to14daysPrice': {
         type: Number,
         default: 7140
      },
      '15plusDaysPrice': {
         type: Number,
         default: 15280
      },
   },

   AC: {
      type: Boolean,
      default: false
   },
   groupCategory: {
      type: String,
      required: true
   },
   groupName: {
      type: String,
      required: true
   },
   imageUrl: {
      type: String
   }

});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
