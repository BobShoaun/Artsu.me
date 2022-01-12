import jwt from "jsonwebtoken";
import { accessTokenSecret, refreshTokenSecret, isProduction } from "../config.js";
import { Token } from "../models/index.js";

/**
 * Authorize by checking JWT Bearer token
 *
 * @returns
 */
export const authorizeUser = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return res.sendStatus(401); // unauthorized
  try {
    const payload = await jwt.verify(accessToken, accessTokenSecret);
    req.user = payload;
    next();
  } catch {
    res.sendStatus(403); // forbidden
  }
};

export const authorizeAdmin = async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
  next();
};

export const unauthorizeBanned = async (req, res, next) => {
  if (req.user.isBanned) return res.sendStatus(403);
  next();
};

export const usernameHandler = async (err, req, res, next) => {
  // check if duplicate key error
  if (err.code === 11000) return res.status(409).type("plain").send("Conflict: Username Taken");
  // check if username whitespace error
  if (err.name === "ValidationError")
    return res.status(400).type("plain").send(`Bad Request: ${err.errors.username.message}`);
  next(err);
};

export const issueTokens = async (req, res, next) => {
  const payload = {
    _id: req.user._id,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    isBanned: req.user.isBanned,
  }; // TODO remove all just keep id

  // generate jwt
  const accessToken = jwt.sign(
    payload,
    accessTokenSecret,
    { expiresIn: "15m" } // expires in 15 minutes
  );

  // generate refresh token
  const refreshToken = jwt.sign(payload, refreshTokenSecret);

  try {
    // upsert token
    const token = await Token.findOne({ userId: req.user._id });
    if (token) {
      token.value = refreshToken;
      await token.save();
    } else await new Token({ value: refreshToken, userId: req.user._id }).save();

    res.cookie("refresh-token", refreshToken, { httpOnly: true, secure: isProduction });
    req.accessToken = accessToken;
    next();
  } catch (e) {
    next(e);
  }
};
