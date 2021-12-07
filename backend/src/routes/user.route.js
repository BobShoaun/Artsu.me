import express from "express";
import { User } from "../models/index.js";
import { authenticate, authorize, usernameHandler } from "../middlewares/user.middleware.js";
import { executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";
import { deleteImage, uploadImage } from "../middlewares/image.middleware.js";
import connectMultiparty from "connect-multiparty";

const multipart = connectMultiparty();

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
    const users = await (query ? User.find({ $text: { $search: query } }) : User.find())
      .skip(offset > 0 ? offset : 0)
      .limit(limit > 0 ? limit : 0);

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
  authorize,
  async (req, res, next) => {
    const { userId } = req.params;
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

router.put(
  "/users/:userId/avatar",
  authenticate,
  authorize,
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) return res.sendStatus(404);
      req.editingUser = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  multipart,
  uploadImage, // upload new avatar
  async (req, res, next) => {
    const user = req.editingUser;
    const oldAvatarId = user.avatarId;
    user.avatarUrl = req.imageUrl;
    user.avatarId = req.imageId;
    req.imageId = oldAvatarId;
    try {
      await user.save();
      next();
    } catch (e) {
      next(e);
    }
  },
  deleteImage, // delete old avatar
  (req, res) => res.send(req.editingUser)
);

/**
 * Deleteing a user's avatar
 */
router.delete(
  "/users/:userId/avatar",
  authenticate,
  authorize,
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      if (!user) return res.sendStatus(404);
      req.imageId = user.avatarId;
      req.editingUser = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  deleteImage, // delete avatar from cloudinary
  async (req, res) => {
    const user = req.editingUser;
    user.avatarId = "";
    user.avatarUrl = "";
    try {
      await user.save();
      res.send(user);
    } catch (e) {
      next(e);
    }
  }
);

router.use(mongoHandler);

export default router;
