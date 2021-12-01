import express from "express";
import { Portfolio, User } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { validateIdParams, validateJsonPatch } from "../middlewares/general.middleware.js";
import { checkDatabaseConn } from "../middlewares/mongo.middleware.js";
import { isMongoError } from "../helpers/mongo.helper.js";
import { executeJsonPatch } from "../helpers/general.helper.js";

const router = express.Router();

/**
 * Get user's portfolio
 */
router.get(
  "/users/:userId/portfolio",
  checkDatabaseConn,
  validateIdParams("userId"),
  async (req, res) => {
    const { userId } = req.params;
    try {
      const portfolio = await Portfolio.findOne({ userId });
      if (!portfolio) return res.sendStatus(404);
      res.send(portfolio);
    } catch (e) {
      if (isMongoError(e)) return res.sendStatus(500);
      res.sendStatus(400);
    }
  }
);

/**
 * Update user's portfolio info
 */
router.patch(
  "/users/:userId/portfolio",
  checkDatabaseConn,
  authenticate,
  validateIdParams("userId"),
  validateJsonPatch,
  async (req, res) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only edit yourself, unless admin

    try {
      const portfolio = await Portfolio.findOne({ userId });
      if (!portfolio) return res.sendStatus(404);

      const forbiddenPaths = ["/userId", "/createdAt", "/updatedAt", "/_id"];
      executeJsonPatch(req, res, portfolio, forbiddenPaths);
      if (res.headersSent) return; // res already sent in executeJsonPatch

      await portfolio.save();
      res.send(portfolio);
    } catch (e) {
      if (isMongoError(e)) return res.sendStatus(500);
      res.sendStatus(400);
    }
  }
);

export default router;
