import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret, googleClientId, isProduction } from "../config.js";

import { User, Portfolio, Token } from "../models/index.js";

import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(googleClientId);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3001/google/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       console.log(accessToken, refreshToken, profile);
//       return done(false, { id: "12312312", name: "BOBOB" });

//       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       //   return done(err, user);
//       // });
//     }
//   )
// );

const router = express.Router();

// router.use(passport.initialize());
// // router.use(passport.session());

// router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     console.log("success!", req.user);
//     res.send("You are logged in" + JSON.stringify(req.user, null, 2));
//     // res.redirect("http://localhost:3000");
//   }
// );

/**
 * Login/registers a user, returns JWT token
 */
router.post("/auth/google", async (req, res, next) => {
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

    const payload = {
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
    };

    // generate jwt
    const accessToken = jwt.sign(
      payload,
      accessTokenSecret,
      { expiresIn: "10s" } // expires in 2 weeks
    );

    // generate refresh token
    const refreshToken = jwt.sign(payload, refreshTokenSecret);

    // upsert token
    const token = await Token.findOne({ userId: user._id });
    if (token) {
      token.value = refreshToken;
      await token.save();
    } else await new Token({ value: refreshToken, userId: user._id }).save();

    res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: isProduction });
    res.send({ user, accessToken, isNew });
  } catch (e) {
    next(e);
  }
});

router.get("/auth/refresh", async (req, res, next) => {
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
    const payload = await jwt.verify(refreshToken, refreshTokenSecret);
    if (!token.user._id.equals(payload._id)) return res.sendStatus(403); // just in case, check if user id matches

    const accessToken = jwt.sign(
      {
        _id: token.user._id,
        email: token.user.email,
        isAdmin: token.user.isAdmin,
        isBanned: token.user.isBanned,
      },
      accessTokenSecret,
      { expiresIn: "10s" } // expires in 2 weeks
    );

    res.send({ accessToken });
  } catch {
    res.sendStatus(403); // forbidden, jwt failed to verify
  }
});

router.delete("/auth/logout", async (req, res, next) => {
  const refreshToken = req.cookies["refresh-token"];
  if (!refreshToken) return res.sendStatus(401); // unauthorized, no refreshtoken in cookie
  try {
    await Token.deleteOne({ value: refreshToken });
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

export default router;
