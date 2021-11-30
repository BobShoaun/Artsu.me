import express from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";
import { authenticate, validateJsonPatch } from "../middlewares/user.middleware.js";
import { checkMongoConn } from "../middlewares/mongo.middleware.js";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", checkMongoConn, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status;
  }
});

/**
 * Supports JSON patch format
 * Operations: replace
 */
router.patch("/:userId", checkMongoConn, authenticate, validateJsonPatch, async (req, res) => {
  const id = req.params.userId;
  if (!ObjectId.isValid(id)) return res.sendStatus(404);
  try {
    const user = await User.findById(id);
    if (!user) return res.sendStatus(404);

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
  } catch {
    res.sendStatus(500);
  }
});

router.post("/register", checkMongoConn, async (req, res) => {
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
    if (e.code === 11000) return res.status(409).type("plain").send("Confict: Username Taken");
    res.sendStatus(500);
  }
});

router.post("/login", checkMongoConn, async (req, res) => {
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
    res.sendStatus(500);
  }
});

export default router;
