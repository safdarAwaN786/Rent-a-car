const Group = require('../models/groupModel');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const Extra = require('../models/extrasModel');



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

      let extra = await Extra.findOne();


      const SCDWObj = extra.Extras.find(obj => obj.extraName === 'Super Collision Damage Waiver (SCDW)');
      const TyresObj = extra.Extras.find(obj => obj.extraName === 'Tyres, Windscreen, Underbody');

      const foundGroup = SCDWObj.priceOfExtra.find(obj => obj.groupName === req.body.groupName);


      if (foundGroup) {
        console.log('Group Exist');

      } else {
        SCDWObj.priceOfExtra.push({
          groupName: req.body.groupName,
          price: 20,
          maxQuantity: 1
        });
        TyresObj.priceOfExtra.push({
          groupName: req.body.groupName,
          price: 20,
          maxQuantity: 1
        });
       
        console.log('Adding Group');
        console.log(extra.Extras[0].priceOfExtra);

        await Extra.findByIdAndUpdate(extra._id, extra, {
          new: true,
        });
      }

      await group.save();

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

    const previousGroup = await Group.findById(req.params.groupId)

    if (previousGroup.groupName !== req.body.groupName) {

      let extra = await Extra.findOne();

      const SCDWObj = extra.Extras.find(obj => obj.extraName === 'Super Collision Damage Waiver (SCDW)');
      const TyresObj = extra.Extras.find(obj => obj.extraName === 'Tyres, Windscreen, Underbody');

      const updatedSCDWObj = SCDWObj.priceOfExtra.find(groupObj => groupObj.groupName === previousGroup.groupName);
      if(updatedSCDWObj){
        updatedSCDWObj.groupName = req.body.groupName;
      } else {
        SCDWObj.priceOfExtra.push({
          groupName : req.body.groupName,
          price : 20,
          maxQuantity : 1
        })
      }
      const updatedTyresObj = TyresObj.priceOfExtra.find(groupObj => groupObj.groupName === previousGroup.groupName);
      if(updatedTyresObj){
        updatedTyresObj.groupName = req.body.groupName;
      } else {
        TyresObj.priceOfExtra.push({
          groupName : req.body.groupName,
          price : 20,
          maxQuantity : 1
        })
      }
      
      console.log(extra.Extras[0].priceOfExtra);
      await Extra.findByIdAndUpdate(extra._id, extra, {
        new: true,
      });
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
    let extra = await Extra.findOne();
    const SCDWObj = extra.Extras.find(obj => obj.extraName === 'Super Collision Damage Waiver (SCDW)');
    const TyresObj = extra.Extras.find(obj => obj.extraName === 'Tyres, Windscreen, Underbody');

    const foundGroup = SCDWObj.priceOfExtra.find(obj => obj.groupName === deletedGroup.groupName);
    if (foundGroup) {
      SCDWObj.priceOfExtra = SCDWObj.priceOfExtra.filter(groupObj => groupObj.groupName !== deletedGroup.groupName);
      TyresObj.priceOfExtra = TyresObj.priceOfExtra.filter(groupObj => groupObj.groupName !== deletedGroup.groupName);

      console.log('Removing Group from Extras');
      console.log(extra.Extras[0].priceOfExtra);

      await Extra.findByIdAndUpdate(extra._id, extra, {
        new: true,
      });
    }


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

    const groups = await Group.find();

    res.status(200).send({ status: true, message: "The Following are the Groups!", data: groups });



  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }

}

module.exports = { addGroup, readGroups, editGroup, deleteGroup };