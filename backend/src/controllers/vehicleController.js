const Vehicle = require('../models/vehicleModel');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;


// * Cloudinary Setup 
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});



// * Upload files To Cloudinary
const uploadToCloudinary = (buffer) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.log(error);
            reject(new Error('Failed to upload file to Cloudinary'));
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.log('error inside uploadation' + error);
  }
};



const addVehicle = async (req, res) => {

  try {

    var imageUrl = '';
    if (req.file) {

      imageUrl = await uploadToCloudinary(req.file.buffer).then((result) => {
        return (result.secure_url)
      }).catch((err) => {
        console.log(err);
      });

    }


    const vehicle = new Vehicle({
      ...req.body,
      imageUrl: imageUrl
    });

    console.log(vehicle);


    await vehicle.save()

    console.log('Added successfully!');

    res.status(200).send({
      status: true, message: "The Vehicle is added!", data: vehicle

    });


  } catch (error) {
    res.status(400).send({ status: false, message: error.message });

  }

}


const editVehicle = async (req, res) => {

  console.log(req.body);
  try {
    let updateFields = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadToCloudinary(req.file.buffer).then((result) => {
        return result.secure_url;
      }).catch((err) => {
        console.log(err);
        throw new Error('Failed to upload image to Cloudinary');
      });

      updateFields.imageUrl = imageUrl;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, updateFields, {
      new: true,
      
    });

    if (!updatedVehicle) {
      return res.status(404).send({ status: false, message: 'Vehicle not found' });
    }

    console.log('Updated successfully!');
    return res.status(200).send({
      status: true,
      message: 'The Vehicle is Updated!',
      data: updatedVehicle
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};



const deleteVehicle = async (req, res) => {

  
  try {
    

  
    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.vehicleId);

    console.log('Deleted successfully!');
    return res.status(200).send({
      status: true,
      message: 'The Vehicle is Deleted!',
      data: deletedVehicle
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};



const readVehicles = async (req, res) => {

  try {

    const vehicles = await Vehicle.find();

    res.status(200).send({ status: true, message: "The Following are the Vehicles!", data: vehicles });



  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }

}

module.exports = { addVehicle, readVehicles, editVehicle, deleteVehicle };