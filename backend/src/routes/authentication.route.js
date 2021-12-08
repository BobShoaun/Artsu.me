import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";
import { checkDatabaseConn, mongoHandler } from "../middlewares/mongo.middleware.js";
import { usernameHandler } from "../middlewares/user.middleware.js";
import { authenticate } from "../middlewares/user.middleware.js";

import { User, Portfolio } from "../models/index.js";

const router = express.Router();

router.use(checkDatabaseConn);

/**
 * Register a new user
 */
router.post(
  "/users/register",
  async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    if (!username || !password || !name) return res.sendStatus(400);
    if (password.length < 8)
      return res.status(400).send("Bad request: Password has to be at least 8 characters long");
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
      next(e);
    }
  },
  usernameHandler
);

/**
 * Login a user, returns JWT token
 */
router.post("/users/login", async (req, res, next) => {
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
    next(e);
  }
});

router.put("/users/:userId/password", authenticate, async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id) return res.sendStatus(403);
  const password = req.body.password;
  if (!password) return res.sendStatus(400);
  try {
    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);
    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;
    await user.save();
    res.send(user);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
