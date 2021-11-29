import express from "express";
import { Artwork, User } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { validateIdParam, validateJsonPatch } from "../middlewares/general.middleware.js";
import { checkDatabaseConn, mongoHandler } from "../middlewares/mongo.middleware.js";
import { executeJsonPatch } from "../helpers/general.helper.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("userId", validateIdParam);

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
            ? Artwork.aggregate([{ $search: { index: "fuzzy", text: { query, path: { wildcard: "*" } } } }])
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
 * Update artwork
 */
router.patch("artworks/:artworkId", authenticate, validateJsonPatch, async (req, res, next) => {
    const { userId } = req.params;
    
    const artworkId = req.params.artworkId
    try {
        const artwork = await Artwork.findById(artworkId)
        // user should edit their own work only
        if (artwork.userId !== userId){
            return res.sendStatus(403);
        }
        if (!artwork) {
            return res.sendStatus(404);
        }
  
        const forbiddenPaths = ["/userId", "/createdAt", "/updatedAt", "/_id", "/likes", "/reports", "/isBanned"];
        executeJsonPatch(req, res, artwork, forbiddenPaths);
        if (res.headersSent) return; // res already sent in executeJsonPatch
  
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