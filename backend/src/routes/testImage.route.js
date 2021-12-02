import express from "express";

import { uploadImage, deleteImage } from "../middlewares/image.middleware.js";

const router = express.Router();

router.post("/images", uploadImage, (req, res) => {
  res.send({ id: req.imageId, url: req.imageUrl });
});

router.delete("/images/:imageId", deleteImage, (req, res) => {
  res.sendStatus(200);
});

export default router;
