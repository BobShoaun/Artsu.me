import express from "express";
import { Tag } from "../models/index.js";
import { authorizeUser } from "../middlewares/authentication.middleware.js";
import { executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("tagId", validateIdParam);

/**
 * Get all tags
 */
router.get("/tags", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.send(tags);
  } catch (e) {
    next(e);
  }
});

/**
 * Get a tag
 */
router.get("/tags/:tagId", async (req, res, next) => {
  const { tagId } = req.params;
  try {
    const tag = await Tag.findById(tagId);
    if (!tag) return res.sendStatus(404);
    res.send(tag);
  } catch (e) {
    next(e);
  }
});

/**
 * Add a tag
 */
router.post("/tags", authorizeUser, async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403); // Admin-only route
  const label = req.body.label;
  const color = req.body.color;
  if (!label || !color) return res.sendStatus(400);

  try {
    const tag = new Tag({ label, color });
    await tag.save();
    res.status(201).send(tag);
  } catch (e) {
    next(e);
  }
});

/**
 * Update a tag
 */
router.patch(
  "/tags/:tagId",
  authorizeUser,
  async (req, res, next) => {
    if (!req.user.isAdmin) return res.sendStatus(403); // Admin-only route
    const { tagId } = req.params;

    try {
      const tag = await Tag.findById(tagId);
      if (!tag) return res.sendStatus(404);
      req.allowedOperations = ["replace"];
      req.allowedPaths = ["/label", "/color"];
      req.patchDoc = tag;
      next();
    } catch (e) {
      next(e);
    }
  },
  executeJsonPatch,
  async (req, res, next) => {
    try {
      const tag = req.patchDoc;
      await tag.save();
      res.send(tag);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * Delete a tag with tagID
 */
router.delete("/tags/:tagId", authorizeUser, async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403); // Admin-only route
  const { tagId } = req.params;

  try {
    const tag = await Tag.findByIdAndDelete(tagId);
    if (!tag) return res.sendStatus(404); // If tag is not found, return and 404.
    // otherwise, we must remove the tag from every artwork that has it.

    res.send(tag);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
