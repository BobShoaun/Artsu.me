import cloudinary from "cloudinary";
import { cloudinaryName, cloudinaryApiKey, cloudinaryApiSecret } from "./config.js";

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export default cloudinary;
