import express from "express";

import { uploadImage, deleteImage } from "../middlewares/image.middleware.js";
import connectMultiparty from "connect-multiparty";

const multipart = connectMultiparty();

const router = express.Router();

// mainly for testing uploading and deleting image in cloudinary

router.post("/images", multipart, uploadImage, (req, res) => {
  res.send({ id: req.imageId, url: req.imageUrl });
});

router.delete("/images/:imageId", deleteImage, (req, res) => {
  res.sendStatus(200);
});

export default router;
