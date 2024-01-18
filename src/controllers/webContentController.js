const Content = require('../models/webContent');
require('dotenv').config()
const cloudinary = require('cloudinary').v2;



// * Cloudinary Setup 
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});


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


const addContent = async (req, res) => {
    try {

        const content = new Content(req.body);

        await content.save().then(() => {
            res.status(200).send({
                status: true, message: "The group is added!", data: content
            });
        })



    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}


const updateContent = async (req, res) => {
    try {
        console.log(req.body);

        await Content.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
        }).then(()=>{
            console.log('Updated Content!');
            res.status(200).send({
                status: true, message: "The content is updated!"
            });
        });
        console.log('Log from outside');

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, message: error.message });
    }
}
const getContent = async (req, res) => {
    try {
        console.log('Request for getting content');
        const content = await Content.findOne();

        res.status(200).send({ status: true, message: "The Web Content is !", data: content });



    } catch (error) {
        res.status(400).send({ status: false, message: error.message });
    }
}

module.exports = { addContent, getContent, updateContent }