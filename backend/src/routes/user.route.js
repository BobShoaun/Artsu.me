import express from "express";
import { User } from "../models/index.js";
import { authenticate, usernameHandler } from "../middlewares/user.middleware.js";
import {
  validateJsonPatch,
  validateIdParam,
  executeJsonPatch,
} from "../middlewares/general.middleware.js";
import { checkDatabaseConn, mongoHandler } from "../middlewares/mongo.middleware.js";

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

/**
 * Update fields on user with userId
 */
router.patch(
  "/users/:userId",
  authenticate,
  validateJsonPatch,
  async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only edit yourself, unless admin
    try {
      const user = await User.findById(userId);
      if (!user) return res.sendStatus(404);

      const forbiddenPaths = ["/_id", "/createdAt", "/updatedAt", "/password"];
      if (!req.user.isAdmin) forbiddenPaths.push("/isAdmin", "/isFeatured", "/isBanned");
      req.forbiddenPaths = forbiddenPaths;
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
  const id = req.params.userId;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
