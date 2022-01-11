import express from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import { accessTokenSecret, googleClientId } from "../config.js";

import { User, Portfolio } from "../models/index.js";

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
      user = new User({ email, givenName, familyName, avatarUrl, providerId, provider: "google" });
      await user.save();
      // create new portfolio
      const portfolio = new Portfolio({ userId: user._id });
      await portfolio.save();

      isNew = true;
    }

    // generate jwt
    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
      },
      accessTokenSecret,
      { expiresIn: "1d" } // expires in 2 weeks
    );
    res.send({ user, accessToken, isNew });
  } catch (e) {
    next(e);
  }
});

export default router;
