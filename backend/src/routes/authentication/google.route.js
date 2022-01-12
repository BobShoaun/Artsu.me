import express from "express";
import { googleClientId } from "../../config.js";
import { User, Portfolio } from "../../models/index.js";
import { issueTokens } from "../../middlewares/authentication.middleware.js";

import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(googleClientId);

const router = express.Router();

/**
 * Login/registers a user, returns JWT token
 */
router.post(
  "/auth/google",
  async (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(400);

    const ticket = await googleClient
      .verifyIdToken({
        idToken: token,
        audience: googleClientId,
      })
      .catch(() => res.sendStatus(401));

    const {
      sub: providerId,
      email,
      picture: avatarUrl,
      given_name: givenName,
      family_name: familyName,
    } = ticket.getPayload();

    try {
      let user = await User.findOne({ providerId });
      let isNew = false;

      if (!user) {
        // create new user
        user = new User({
          email,
          givenName,
          familyName,
          avatarUrl,
          providerId,
          provider: "google",
          isVerified: true,
        });
        await user.save();
        // create new portfolio
        const portfolio = new Portfolio({ userId: user._id });
        await portfolio.save();

        isNew = true;
      }

      req.user = user;
      req.isNew = isNew;
      next();
    } catch (e) {
      next(e);
    }
  },
  issueTokens,
  (req, res) => res.send({ user: req.user, accessToken: req.accessToken, isNew: req.isNew })
);

export default router;
