import express from "express";
import jwt from "jsonwebtoken";
import { refreshTokenSecret } from "../../config.js";
import { checkDatabaseConn, mongoHandler } from "../../middlewares/mongo.middleware.js";
import { authorizeUser, issueAccessToken } from "../../middlewares/authentication.middleware.js";
import { Token } from "../../models/index.js";

import passwordRoutes from "./password.route.js";
import googleRoutes from "./google.route.js";
import facebookRoutes from "./facebook.route.js";

const router = express.Router();

router.use(checkDatabaseConn);

router.use(passwordRoutes);
router.use(googleRoutes);
router.use(facebookRoutes);

router.get(
  "/auth/refresh",
  async (req, res, next) => {
    const refreshToken = req.cookies["refresh-token"];
    if (!refreshToken) return res.sendStatus(401); // unauthorized, no refreshtoken in cookie

    let token = null;
    try {
      token = await Token.findOne({ value: refreshToken }).populate("user");
      if (!token) return res.sendStatus(403); // forbidden, refreshtoken does not exist in db
    } catch (e) {
      return next(e);
    }

    try {
      const payload = jwt.verify(refreshToken, refreshTokenSecret);
      if (!token.userId.equals(payload._id)) return res.sendStatus(403); // just in case, check if user id matches

      req.user = token.user;
      next();
    } catch {
      res.sendStatus(403); // forbidden, jwt failed to verify
    }
  },
  issueAccessToken,
  (req, res) => res.send({ accessToken: req.accessToken, user: req.user })
);

router.delete("/auth/logout", authorizeUser, async (req, res, next) => {
  const refreshToken = req.cookies["refresh-token"];
  if (!refreshToken) return res.sendStatus(401); // unauthorized, no refreshtoken in cookie
  try {
    await Token.deleteOne({ value: refreshToken });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.use(mongoHandler);

export default router;
