import express from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";
import { authenticate, validateJsonPatch } from "../middlewares/user.middleware.js";
import { checkDatabaseConn } from "../middlewares/mongo.middleware.js";
import { isMongoError } from "../helpers/mongo.helper.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", checkDatabaseConn, async (req, res) => {
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
 * Supports JSON patch format
 * Operations: replace
 */
router.patch("/:userId", checkDatabaseConn, authenticate, validateJsonPatch, async (req, res) => {
  const id = req.params.userId;
  if (!ObjectId.isValid(id)) return res.sendStatus(404);
  try {
    const user = await User.findById(id);
    if (!user) return res.sendStatus(404);

    if (id !== req.user._id && !req.user.isAdmin) return res.sendStatus(403); // can only edit yourself, unless admin

    for (const action of req.body) {
      // only replace is possible (for now)
      const keys = action.path.split("/").filter(key => key);
      let patchObj = user;
      for (const key of keys.slice(0, -1)) {
        if (!patchObj.hasOwnProperty(key)) return res.sendStatus(404);
        patchObj = patchObj[key];
      }
      if (!(keys[keys.length - 1] in patchObj.toObject())) return res.sendStatus(404);
      patchObj[keys[keys.length - 1]] = action.value;
    }
    await user.save();
    res.send(user);
  } catch (e) {
    if (isMongoError(e)) return res.sendStatus(500);
    res.sendStatus(400);
  }
});

router.delete("/:userId", checkDatabaseConn, authenticate, async (req, res) => {
  const id = req.params.userId;
  if (!ObjectId.isValid(id)) return res.sendStatus(404);
  try {
    if (!req.user.isAdmin) return res.sendStatus(403);
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.sendStatus(404);
    res.send(user);
  } catch (e) {
    if (isMongoError(e)) return res.sendStatus(500);
    res.sendStatus(400);
  }
});

router.post("/register", checkDatabaseConn, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  if (!username || !password || !name) return res.sendStatus(400);
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: passwordHash, name });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    // check if duplicate key error
    if (e.code === 11000) return res.status(409).type("plain").send("Conflict: Username Taken");
    // check if username whitespace error
    if (e.errors.username.name === "ValidatorError")
      return res.status(400).type("plain").send(`Bad Request: ${e.errors.username.message}`);
    if (isMongoError(e)) return res.sendStatus(500);
    res.sendStatus(400);
  }
});

router.post("/login", checkDatabaseConn, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) return res.sendStatus(400);
  try {
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(404);
    // authenticate
    if (!(await bcrypt.compare(password, user.password))) return res.sendStatus(401);
    // generate jwt
    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        name: user.name,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
      },
      accessTokenSecret,
      { expiresIn: "14d" } // expires in 2 weeks
    );
    res.send({ user, accessToken });
  } catch {
    if (isMongoError(e)) return res.sendStatus(500);
    res.sendStatus(400);
  }
});

export default router;
