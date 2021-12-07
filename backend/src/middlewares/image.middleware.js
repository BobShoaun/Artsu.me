import cloudinary from "../cloudinary.js";

/**
 * Get image from multipart form and uploads it to cloudinary
 * key for image must be "image"
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const uploadImage = async (req, res, next) => {
  const imagePath = req.files?.image?.path;
  if (!imagePath) return res.sendStatus(400);
  try {
    const response = await cloudinary.v2.uploader.upload(req.files.image.path);
    req.imageUrl = response.url;
    req.imageId = response.public_id;
    next();
  } catch (e) {
    next(e);
  }
};

export const deleteImage = async (req, res, next) => {
  const imageId = req.imageId;
  if (!imageId) return res.sendStatus(400);
  try {
    await cloudinary.v2.uploader.destroy(imageId);
    next();
  } catch (e) {
    next(e);
  }
};
