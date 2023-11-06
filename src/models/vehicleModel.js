const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
   name : {
    type : String,
    required : true
   },
   engineSize : {
    type : String,
    required : true
   },
   adults : {
    type : Number,
    required : true
   },
   doors : {
    type : Number,
    required : true
   },
   children : {
    type : Number,
    required : true
   },
   seats : {
    type : Number,
    required : true
   },
   bigLuggage : {
    type : String,
    required : true
   },
   smallLuggage : {
    type : String,
    required : true
   },
   transmissionType : {
    type : String,
    enum : ['Manual', 'Automatic']
   },
   price : {
      type : Number,
      required: true
   },
   
   AC : {
    type : Boolean,
    default : false
   },
   vehicleType: {
    type : String,
    enum : ['Saloon Manual Transmission', 'Saloon Automatic Transmission', 'Cabrio/Open Top', 'People Carrier', 'SUV/4WD',]
   },
   group : {
    type: String,
    required : true
   },
   imageUrl : {
    type: String
   }

});

const Vehicle = mongoose.model('vehicle', vehicleSchema);

module.exports = Vehicle;
