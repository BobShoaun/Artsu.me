import express from "express";
import { Artwork } from "../models/index.js";
import { authenticate, authorize } from "../middlewares/user.middleware.js";
import { executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";
import { uploadImage, deleteImage } from "../middlewares/image.middleware.js";
import connectMultiparty from "connect-multiparty";

const multipart = connectMultiparty();

const router = express.Router();

router.use(checkDatabaseConn);
router.param("userId", validateIdParam);
router.param("artworkId", validateIdParam);

/**
 * Post a new artwork
 */
router.post(
  "/users/:userId/artworks",
  authenticate,
  authorize,
  multipart,
  (req, res, next) => {
    if (!req.body.name || !req.body.summary) return res.sendStatus(400);
    next();
  },
  uploadImage,
  async (req, res, next) => {
    const { userId } = req.params;
    const name = req.body.name;
    const summary = req.body.summary;
    const description = req.body.description;
    const tagIds = JSON.parse(req.body.tagIds);
    try {
      const artwork = new Artwork({
        name,
        summary,
        description,
        userId,
        imageId: req.imageId,
        imageUrl: req.imageUrl,
        tagIds,
      });
      await artwork.save();
      res.status(201).send(artwork);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * Delete artwork
 */
router.delete(
  "/users/:userId/artworks/:artworkId",
  authenticate,
  authorize,
  async (req, res, next) => {
    const { userId, artworkId } = req.params;
    try {
      const artwork = await Artwork.findOneAndRemove({ _id: artworkId, userId });
      if (!artwork) return res.sendStatus(404);
      req.artwork = artwork;
      req.imageId = artwork.imageId;
      next();
    } catch (e) {
      next(e);
    }
  },
  deleteImage, // delete frm cloudinary
  (req, res) => res.send(req.artwork) // send deleted artwork
);

/**
 * Get all artworks for a user
 */
router.get("/users/:userId/artworks", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const artworks = await Artwork.find({ userId });
    res.send(artworks);
  } catch (e) {
    next(e);
  }
});

/**
 * Get artworks with query
 */
router.get("/artworks", async (req, res, next) => {
  const query = req.query.query;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);

  try {
    const artworks = await (query ? Artwork.find({ $text: { $search: query } }) : Artwork.find())
      .skip(offset > 0 ? offset : 0)
      .limit(limit > 0 ? limit : 0);

    res.send(artworks);
  } catch (e) {
    next(e);
  }
});

/**
 * Get artwork by Id
 */
router.get("/artworks/:artworkId", async (req, res, next) => {
  const { artworkId } = req.params;
  try {
    const artwork = await Artwork.findById(artworkId).populate("user").populate("tags");
    if (!artwork) return res.sendStatus(404);
    res.json(artwork);
  } catch (e) {
    next(e);
  }
});

/**
 * Update artwork
 */
router.patch(
  "/artworks/:artworkId",
  authenticate,
  async (req, res, next) => {
    const { artworkId } = req.params;
    try {
      const artwork = await Artwork.findById(artworkId);
      if (!artwork) return res.sendStatus(404);

      // user should edit their own work only
      if (!artwork.userId.equals(req.user._id) && !req.user.isAdmin) return res.sendStatus(403);

      req.allowedPaths = ["/name", "/summary", "/description", "/tagIds"];
      if (req.user.isAdmin)
        req.allowedPaths.push("/imageUrl", "/imageId", "/likes", "/isBanned", "/reports");
      req.allowedOperations = ["replace", "add", "remove"];
      req.patchDoc = artwork;
      next();
    } catch (e) {
      next(e);
    }
  },
  executeJsonPatch,
  async (req, res, next) => {
    try {
      const artwork = req.patchDoc;
      await artwork.save();
      res.send(artwork);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * Allows a user to report a piece of artwork
 */
router.post("/artworks/:artworkId/reports", authenticate, async (req, res, next) => {
  const artworkId = req.params.artworkId;
  const reportingUser = req.user._id;
  const reportText = req.body.message;

  if (!reportText) return res.sendStatus(400);

  try {
    const artwork = await Artwork.findById(artworkId);
    // user should edit their own work only
    if (!artwork) return res.sendStatus(404);

    const report = {
      userId: reportingUser,
      message: reportText,
    };

    artwork.reports.push(report);

    await artwork.save();
    res.status(201).send(artwork);
  } catch (e) {
    next(e);
  }
});

/**
 * Allows a user to like a piece of artwork
 */
router.post("/artworks/:artworkId/like", authenticate, async (req, res, next) => {
  const artworkId = req.params.artworkId;
  const userId = req.user._id;

  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) return res.sendStatus(404);

    //checking if they have liked the artwork already
    if (artwork.likes.includes(userId)) return res.status(200).send(artwork);
    artwork.likes.push(userId);
    await artwork.save();
    res.status(201).send(artwork);
  } catch (e) {
    next(e);
  }
});

/**
 * Allows a user to unlike a piece of artwork
 */
router.delete("/artworks/:artworkId/unlike", authenticate, async (req, res, next) => {
  const artworkId = req.params.artworkId;
  const userId = req.user._id;

  try {
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) return res.sendStatus(404);

    //checking if they have liked the artwork already
    if (!artwork.likes.includes(userId)) return res.status(200).send(artwork);
    artwork.likes.splice(artwork.likes.indexOf(userId), 1);
    await artwork.save();
    res.status(201).send(artwork);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
