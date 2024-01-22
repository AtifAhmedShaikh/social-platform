import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from "../config/envConfig.js";
import ApiError from "./ApiError.js";

// setup configuration settings of cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

// utility function to upload Images or files on third party server - cloudinary
const uploadOnCloudinary = async fileLocalPath => {
  try {
    const response = await cloudinary.uploader.upload(fileLocalPath, {
      resource_type: "auto",
    });
    // remove file from server after upload on cloudinary
    fs.unlinkSync(fileLocalPath, err => {
      console.log(err);
    });
    return response;
  } catch (error) {
    // remove file from local server
    fs.unlinkSync(fileLocalPath, err => {
      console.log(err);
    });
    // If Error while uploading, throw ApiError to user for please try again
    throw new ApiError(500, "Error while upload Image on cloudinary ");
  }
};

export default uploadOnCloudinary;
