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
   prices: [
      {
         season : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'saeson'
         },
         sixDaysPrice : {
            type : Number,
            default : 30,
            required : true
         },
         fourteenDaysPrice : {
            type : Number,
            default : 40,
            required : true
         },
         fifteenDaysPrice : {
            type : Number,
            default : 50,
            required : true
         },
      }
   ],
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
