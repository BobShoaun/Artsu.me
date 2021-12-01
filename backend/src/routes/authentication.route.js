import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";
import { checkDatabaseConn } from "../middlewares/mongo.middleware.js";
import { isMongoError } from "../helpers/mongo.helper.js";

import { User, Portfolio } from "../models/index.js";

const router = express.Router();

/**
 * Register a new user
 */
router.post("/users/register", checkDatabaseConn, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  if (!username || !password || !name) return res.sendStatus(400);
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    // create new user
    const user = new User({ username, password: passwordHash, name });
    await user.save();
    // create new portfolio
    const portfolio = new Portfolio({ userId: user._id });
    await portfolio.save();

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

/**
 * Login a user, returns JWT token
 */
router.post("/users/login", checkDatabaseConn, async (req, res) => {
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
