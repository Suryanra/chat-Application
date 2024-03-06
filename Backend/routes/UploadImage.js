const cloudinary=require('cloudinary').v2;
const path=require('path');

try {
      cloudinary.config({
          cloud_name: "dnr7j5mbb",
          api_key: "611922819764379",
          api_secret: "jHYF-FufemUdMs6w9tLrhfBvlLw"
      });
      console.log("Cloudinary connected successfully");
  } catch (error) {
      console.error("Error connecting to Cloudinary:", error);
      console.log("Cloudinary connection failed");
  }
  

const uploadImage = async (imageName) => {
      console.log("upload i mages  in cloud funtion called")
      try {
            console.log("me")
          const imagePath = path.join(__dirname, "..", "Images", imageName);
          console.log("Function called");
  
          const cloudinaryFolder = "userProfile";
          const result = await cloudinary.uploader.upload(imagePath, {
              folder: cloudinaryFolder,
              width: 300,
              crop: 'scale'
          });
  
          console.log("Image uploaded successfully:", result.url);
          return result.url;
      } catch (error) {
          console.error("Error uploading image:", error);
          return null;
      }
  };

  module.exports = uploadImage;
  