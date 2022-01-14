import express from "express";
import { User, Portfolio } from "../../models/index.js";
import {
  issueAccessToken,
  issueRefreshToken,
} from "../../middlewares/authentication.middleware.js";
import axios from "axios";

const router = express.Router();

/**
 * Login/registers a user, returns JWT token
 */
router.post(
  "/auth/facebook",
  async (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(400);

    let providerId = null;
    let email = null;
    let avatarUrl = null;
    let givenName = null;
    let familyName = null;
    try {
      const { data } = await axios({
        url: "https://graph.facebook.com/me",
        method: "get",
        params: {
          fields: ["id", "email", "first_name", "last_name", "picture"].join(","),
          access_token: token,
        },
      });
      providerId = data.id;
      email = data.email;
      avatarUrl = data.picture.data.is_silhouette ? null : data.picture.data.url; // dont store if default image
      givenName = data.first_name;
      familyName = data.last_name;
    } catch {
      return res.sendStatus(401);
    }

    try {
      let user = await User.findOne({ $and: [{ providerId }, { provider: "facebook" }] });
      let isNew = false;

      if (!user) {
        // create new user
        user = new User({
          email,
          givenName,
          familyName,
          avatarUrl,
          providerId,
          provider: "facebook",
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
  issueAccessToken,
  issueRefreshToken,
  (req, res) => res.send({ user: req.user, accessToken: req.accessToken, isNew: req.isNew })
);

export default router;
