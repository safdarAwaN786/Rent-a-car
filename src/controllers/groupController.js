const Group = require('../models/groupModel');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const Extra = require('../models/extrasModel');
const Season = require('../models/seasonModel');



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



const addGroup = async (req, res) => {

  try {

    var imageUrl = '';
    if (req.file) {

      imageUrl = await uploadToCloudinary(req.file.buffer).then((result) => {
        return (result.secure_url)
      }).catch((err) => {
        console.log(err);
      });

    }

    const groupExist = await Group.findOne({ groupName: req.body.groupName })


    if (groupExist) {
      return res.status(401).json({ message: 'Group Exist Already!' });
    } else {

      const group = new Group({
        ...req.body,
        imageUrl: imageUrl
      });
      group.prices = [];

      const seasons = await Season.find();
      seasons.map(seasonObj => {
        group.prices.push({ season: seasonObj._id })
      })

      await group.save();

      let extra = await Extra.findOne().populate({
        path: 'Extras.priceOfExtra.group',
        model: 'Group'
      });


      const SCDWObj = extra.Extras.find(obj => obj.extraName === 'Super Collision Damage Waiver (SCDW)');
      const TyresObj = extra.Extras.find(obj => obj.extraName === 'Tyres, Windscreen, Underbody');

      const foundGroup = SCDWObj.priceOfExtra?.find(obj => obj.group?._id === group._id);


      if (foundGroup) {
        console.log('Group Exist');

      } else {
        SCDWObj.priceOfExtra.push({
          group: group._id,
          price: 20,
          maxQuantity: 1
        });
        TyresObj.priceOfExtra.push({
          group: group._id,
          price: 20,
          maxQuantity: 1
        });

        await Extra.findByIdAndUpdate(extra._id, extra, {
          new: true,
        });
      }
      console.log('Added successfully!');

      res.status(200).send({
        status: true, message: "The group is added!", data: group
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: false, message: error.message });
  }
}


const editGroup = async (req, res) => {

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

    const updatedGroup = await Group.findByIdAndUpdate(req.params.groupId, updateFields, {
      new: true,
    });



    console.log(updatedGroup);

    console.log('Updated successfully!');
    return res.status(200).send({
      status: true,
      message: 'The Group is Updated!',
      data: updatedGroup
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};



const deleteGroup = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.groupId);
    let extra = await Extra.findOne().populate({
      path: 'Extras.priceOfExtra.group',
      model: 'Group'
    });
    const SCDWObj = extra.Extras.find(obj => obj.extraName === 'Super Collision Damage Waiver (SCDW)');
    const TyresObj = extra.Extras.find(obj => obj.extraName === 'Tyres, Windscreen, Underbody');
    console.log(TyresObj.priceOfExtra);

    SCDWObj.priceOfExtra = SCDWObj.priceOfExtra?.filter(groupObj => groupObj.group?._id !== req.params.groupId);
    TyresObj.priceOfExtra = TyresObj.priceOfExtra?.filter(groupObj => groupObj.group?._id !== req.params.groupId);

    await Extra.findByIdAndUpdate(extra._id, extra, {
      new: true,
    });
    console.log('Deleted successfully!');
    return res.status(200).send({
      status: true,
      message: 'The Group is Deleted!',
      data: deletedGroup
    });
  } catch (error) {
    console.error('Error updating vehicle:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};



const readGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate({
      path: 'prices.season',
      model: 'season'
    });
    res.status(200).send({ status: true, message: "The Following are the Groups!", data: groups });
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
}

module.exports = { addGroup, readGroups, editGroup, deleteGroup };