import express from "express";
import { Artwork } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { validateJsonPatch, executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";
import { uploadImage, deleteImage } from "../middlewares/image.middleware.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("userId", validateIdParam);
router.param("artworkId", validateIdParam);

/**
 * Post a new artwork
 */
router.post("/users/:userId/artworks", authenticate, uploadImage, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);

  const name = req.body.name;
  const summary = req.body.summary;
  const description = req.body.description;
  const tagIds = req.body.tagIds;

  if (!name) return res.sendStatus(400);

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
});

/**
 * Delete artwork
 */
router.delete(
  "/users/:userId/artworks/:artworkId",
  authenticate,
  async (req, res, next) => {
    const { userId, artworkId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
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
    const artworks = await (query
      ? Artwork.aggregate([
          { $search: { index: "fuzzy", text: { query, path: { wildcard: "*" } } } },
        ])
      : Artwork.find()
    )
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
  const artworkId = req.params.artworkId
  try {
      const artworks = Artwork.findById(artworkId)
      if (!artworks) {
          return res.sendStatus(404)
      }
      res.send(artworks);
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
  validateJsonPatch,
  async (req, res, next) => {
    const { artworkId } = req.params;
    try {
      const artwork = await Artwork.findById(artworkId);
      if (!artwork) return res.sendStatus(404);

      // user should edit their own work only
      if (artwork.userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);

      req.forbiddenPaths = [
        "/userId",
        "/createdAt",
        "/updatedAt",
        "/_id",
        "/likes",
        "/reports",
        "/isBanned",
      ];
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
 * Update likes of an artwork
 */

router.use(mongoHandler);

export default router;
