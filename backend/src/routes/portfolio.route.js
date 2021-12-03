import express from "express";
import { Portfolio, User } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("userId", validateIdParam);

/**
 * Get user's portfolio
 */
router.get("/users/:userId/portfolio", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const portfolio = await Portfolio.findOne({ userId });
    if (!portfolio) return res.sendStatus(404);
    res.send(portfolio);
  } catch (e) {
    next(e);
  }
});

/**
 * Update user's portfolio info
 */
router.patch(
  "/users/:userId/portfolio",
  authenticate,
  async (req, res, next) => {
    const { userId } = req.params;
    if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only edit yourself, unless admin

    try {
      const portfolio = await Portfolio.findOne({ userId });
      if (!portfolio) return res.sendStatus(404);

      req.allowedPaths = ["/color/*", "/section/*"];
      req.allowedOperations = ["replace", "add", "remove"];
      req.patchDoc = portfolio;
      next();
    } catch (e) {
      next(e);
    }
  },
  executeJsonPatch,
  async (req, res, next) => {
    try {
      const portfolio = req.patchDoc;
      await portfolio.save();
      res.send(portfolio);
    } catch (e) {
      next(e);
    }
  }
);

router.use(mongoHandler);

export default router;
