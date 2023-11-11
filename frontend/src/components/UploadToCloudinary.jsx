import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // You may need to install the 'uuid' package

const uploadToCloudinary = async (file) => {
  console.log(file);
  try {
    const cloudName = 'dzpac6i3a'; // Replace with your Cloudinary cloud name
    const apiKey = '741614516484965'; // Replace with your Cloudinary API key
    const uploadPreset = 'carHire'; // Replace with your Cloudinary upload preset

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    console.log(response);
    // Extract the secure_url from the Cloudinary response
    const secureUrl = response.data.secure_url;

    return secureUrl;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error; // You might want to handle the error more gracefully in your application
  }
};

export default uploadToCloudinary;
