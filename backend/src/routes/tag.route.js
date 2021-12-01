import express from "express";
import { Tag } from "../models/index.js";
import { authenticate } from "../middlewares/user.middleware.js";
import { validateJsonPatch, validateIdParam } from "../middlewares/general.middleware.js";
import { checkDatabaseConn, mongoHandler } from "../middlewares/mongo.middleware.js";
import { executeJsonPatch } from "../helpers/general.helper.js";

const router = express.Router();

router.use(checkDatabaseConn);
router.param("tagId", validateIdParam);

/**
 * Get all tags, with query and pagination
 */
router.get("/tags", async (req, res, next) => {
  try {
    const tags = await (Tag.find())
    res.send(tags);
  } 
  catch (e) {next(e);}
});

/**
 * Add a tag
 */
 router.post("/tags", authenticate, async (req, res, next) => {
    if (!req.user.isAdmin) return res.sendStatus(403); // Admin-only route
    const label = req.body.label;
    const color = req.body.color;
    if (!label || !color) return res.sendStatus(400);
    
    try {
      const tag = new Tag({label, color});
      await tag.save();
      res.status(201).send(tag);
    } 
    catch (e) {next(e);}
  });

/**
 * Update a tag
 */
router.patch("/tags/:tagId", authenticate, validateJsonPatch, async (req, res, next) => {
    if (!req.user.isAdmin) return res.sendStatus(403); // Admin-only route
    const { tagId } = req.params;
    
    try {
      const tag = await Tag.findById(tagId);
      if (!tag) return res.sendStatus(404);
      executeJsonPatch(req, res, tag, ["/_id", "/createdAt", "/updatedAt"]);
      if (res.headersSent) return; // res already sent in executeJsonPatch
      await tag.save();
      res.send(tag);
    } 
    catch (e) {next(e);}
  });

/**
 * Delete a tag with tagID
 */
router.delete("/tags/:tagId", authenticate, async (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403); // Admin-only route
  const { tagId } = req.params;
  
  try {
    const tag = await Tag.findByIdAndDelete(tagId);
    if (!tag) return res.sendStatus(404); // If tag is not found, return and 404.
    // otherwise, we must remove the tag from every artwork that has it.

    res.send(tag);
  } 
  catch (e) {next(e);}
});

router.use(mongoHandler);

export default router;
