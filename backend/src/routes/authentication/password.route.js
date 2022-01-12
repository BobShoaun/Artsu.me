import express from "express";
import bcrypt from "bcrypt";
import { issueTokens, usernameHandler } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authentication.middleware.js";

import { User, Portfolio } from "../../models/index.js";

const router = express.Router();

/**
 * Register a new user
 */
router.post("/auth/register", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const givenName = req.body.givenName;
  const familyName = req.body.familyName;

  if (!email || !password || !givenName || !familyName) return res.sendStatus(400);
  if (password.length < 8)
    return res.status(400).send("Bad request: Password has to be at least 8 characters long");

  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).send("Bad request: invalid email format");

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    // create new user
    const user = new User({ email, givenName, familyName, password: passwordHash });
    await user.save();
    // create new portfolio
    const portfolio = new Portfolio({ userId: user._id });
    await portfolio.save();

    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
});

/**
 * Login a user, returns JWT token
 */
router.post(
  "/auth/login",
  async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (!password) return res.sendStatus(400);
    if (!email && !username) return res.sendStatus(400); // login with email or username

    if (email && !/\S+@\S+\.\S+/.test(email))
      return res.status(400).send("Bad request: invalid email format");

    try {
      const user = await User.findOne({ email, username });
      if (!user) return res.sendStatus(404);

      if (!user.password) return res.sendStatus(401); // no password, auth from other provider.

      // compare password hash
      if (!(await bcrypt.compare(password, user.password))) return res.sendStatus(401);

      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  },
  issueTokens,
  (req, res) => res.send({ user: req.user, accessToken: req.accessToken })
);

router.put("/users/:userId/password", authorizeUser, async (req, res, next) => {
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

export default router;
