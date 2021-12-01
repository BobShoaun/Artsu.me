import express from "express";
import { User } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { validateJsonPatch, validateIdParams } from "../middlewares/general.middleware.js";
import { checkDatabaseConn } from "../middlewares/mongo.middleware.js";
import { isMongoError } from "../helpers/mongo.helper.js";
import { executeJsonPatch } from "../helpers/general.helper.js";

const router = express.Router();

/**
 * Get all users, with query and pagination
 */
router.get("/users", checkDatabaseConn, async (req, res) => {
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
    if (isMongoError(e)) return res.sendStatus(500);
    res.sendStatus(400);
  }
});

/**
 * Update fields on user with userId
 */
router.patch(
  "/users/:userId",
  checkDatabaseConn,
  authenticate,
  validateIdParams("userId"),
  validateJsonPatch,
  async (req, res) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only edit yourself, unless admin
    try {
      const user = await User.findById(userId);
      if (!user) return res.sendStatus(404);

      const forbiddenPaths = ["/_id", "/createdAt", "/updatedAt", "/password"];
      if (!req.user.isAdmin) forbiddenPaths.push("/isAdmin", "/isFeatured", "/isBanned");
      executeJsonPatch(req, res, user, forbiddenPaths);
      if (res.headersSent) return; // res already sent in executeJsonPatch

      await user.save();
      res.send(user);
    } catch (e) {
      // check if duplicate key error
      if (e.code === 11000) return res.status(409).type("plain").send("Conflict: Username Taken");
      // check if username whitespace error
      if (e.errors.username.name === "ValidatorError")
        return res.status(400).type("plain").send(`Bad Request: ${e.errors.username.message}`);
      if (isMongoError(e)) return res.sendStatus(500);
      res.sendStatus(400);
    }
  }
);

/**
 * Delete a user with userId
 */
router.delete(
  "/users/:userId",
  checkDatabaseConn,
  authenticate,
  validateIdParams("userId"),
  async (req, res) => {
    if (!req.user.isAdmin) return res.sendStatus(403);
    const id = req.params.userId;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.sendStatus(404);
      res.send(user);
    } catch (e) {
      if (isMongoError(e)) return res.sendStatus(500);
      res.sendStatus(400);
    }
  }
);

export default router;
