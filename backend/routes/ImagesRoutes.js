const express = require('express');
const ImageRouter = express.Router();
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });


  ImageRouter.get('/deleteImage/:public_id', async (req, res) => {
    console.log(78);
    
    const { public_id } = req.params;
  
    try {
      const result = await cloudinary.uploader.destroy( public_id);
      res.send({ message: "Image deleted successfully", result });
    } catch (error) {
      console.error('Error deleting image:', error);
      res.status(500).send("Failed to delete image");
    }
  });






module.exports = ImageRouter;