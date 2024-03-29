import express from "express";
import { Artwork, Portfolio, User } from "../models/index.js";
import { authorizeUser, authorizeAdmin } from "../middlewares/authentication.middleware.js";
import { executeJsonPatch } from "../middlewares/general.middleware.js";
import {
  checkDatabaseConn,
  mongoHandler,
  validateIdParam,
} from "../middlewares/mongo.middleware.js";
import { artworkHandler } from "../middlewares/portfolio.middleware.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("userId", validateIdParam);

router.get("/users/username/:username/portfolio", async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(404);

    const portfolio = await Portfolio.findOne({ userId: user._id })
      .populate("user")
      .populate("section.project.artworks");

    if (!portfolio) return res.sendStatus(404);

    const pf = portfolio.toObject();

    // manually populate artwordIds in experiences
    for (const experience of pf.section.experience.experiences) {
      const artworks = await Artwork.find({ _id: { $in: experience.artworkIds } });
      experience.artworks = artworks;
    }

    res.send(pf);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

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
  authorizeUser,
  authorizeAdmin,
  async (req, res, next) => {
    const { userId } = req.params;
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
  },
  artworkHandler
);

router.use(mongoHandler);

export default router;
