import express from "express";
import bcrypt from "bcrypt";
import {
  issueAccessToken,
  issueRefreshToken,
  usernameHandler,
} from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authentication.middleware.js";

import { User, Portfolio } from "../../models/index.js";
import jwt from "jsonwebtoken";
import { emailTokenSecret, port, gmailUsername, gmailPassword } from "../../config.js";
import nodemailer from "nodemailer";

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
  issueAccessToken,
  issueRefreshToken,
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

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: gmailUsername,
    pass: gmailPassword,
  },
});

router.post("/users/:userId/email/verification/send", authorizeUser, async (req, res, next) => {
  const { userId } = req.params;
  const { redirectUrl } = req.body;
  if (userId !== req.user._id) return res.sendStatus(403);

  // generate jwt
  const emailToken = jwt.sign(
    { _id: userId },
    emailTokenSecret,
    { expiresIn: "12h" } // expires in 12 hours
  );

  try {
    const params = new URLSearchParams({ redirectUrl });
    const verificationUrl = `${req.protocol}://${req.hostname}:${port}/users/${userId}/email/verification/${emailToken}?${params}`;
    await transporter.sendMail({
      from: '"Artsu.me" <artsu.me18@gmail.com>',
      to: req.user.email,
      subject: "Artsu.me - Email Verification",
      html: /*html*/ `
      <p>
        Please click the link to verify your email
        <a href="${verificationUrl}" target="_blank">click here</a>
      </p>
      <p>
        if the link doesn't work, copy and paste this into your browser:
        <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>
      </p>
    `,
    });

    console.log("sending email to", req.user.email);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

/**
 * Has to be GET request for it to work with anchor tag
 */
router.get("/users/:userId/email/verification/:token", async (req, res, next) => {
  const { userId, token } = req.params;
  const { redirectUrl } = req.query;
  if (!userId || !token) return res.sendStatus(400);
  try {
    const payload = jwt.verify(token, emailTokenSecret);
    if (payload._id !== userId) return res.sendStatus(400); // userId does not match that in jwt
  } catch {
    res.status(401).send("Email verification failed"); // unauthorized, jwt invalid or expired
  }
  try {
    const user = await User.findById(userId);
    if (user.isVerified) return res.status(200).send("User already verified");

    user.isVerified = true; // confirm user verification
    await user.save();
    res.redirect(redirectUrl);
  } catch (e) {
    next(e);
  }
});

export default router;
