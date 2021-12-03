import express from "express";
import { User } from "../models/index.js";
import { authenticate, usernameHandler } from "../middlewares/user.middleware.js";
import { executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";
import { uploadImage } from "../middlewares/image.middleware.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("userId", validateIdParam);

/**
 * Get all users, with query and pagination
 */
router.get("/users", async (req, res, next) => {
  const query = req.query.query;
  const limit = parseInt(req.query.limit);
  const offset = parseInt(req.query.offset);

  try {
    const users = await (query
      ? User.aggregate([{ $search: { index: "fuzzy", text: { query, path: { wildcard: "*" } } } }])
      : User.find()
    )
      .skip(offset > 0 ? offset : 0)
      .limit(limit > 0 ? limit : 0);

    for (const user of users) delete user.password; // mainly for aggregate query not removing password

    res.send(users);
  } catch (e) {
    next(e);
  }
});

router.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

/**
 * Update fields on user with userId
 */
router.patch(
  "/users/:userId",
  authenticate,
  async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only edit yourself, unless admin
    try {
      const user = await User.findById(userId);
      if (!user) return res.sendStatus(404);

      req.allowedPaths = ["/name", "/username"];
      if (req.user.isAdmin) req.allowedPaths.push("/isFeatured", "/isAdmin", "/isBanned");
      req.allowedOperations = ["replace"];
      req.patchDoc = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  executeJsonPatch,
  async (req, res, next) => {
    try {
      const user = req.patchDoc;
      await user.save();
      res.send(user);
    } catch (e) {
      next(e);
    }
  },
  usernameHandler
);

/**
 * Delete a user with userId
 */
router.delete("/users/:userId", authenticate, async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403);
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.put("/users/:userId/avatar", authenticate, uploadImage, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);
    user.avatarUrl = req.imageUrl;
    user.avatarId = req.imageId;
    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
