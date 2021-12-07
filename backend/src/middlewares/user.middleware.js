import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";

/**
 * Authenticate by checking JWT Bearer token
 *
 * @returns
 */
export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return res.sendStatus(401); // unauthorized
  try {
    const user = await jwt.verify(accessToken, accessTokenSecret);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403); // forbidden
  }
};

export const authorize = async (req, res, next) => {
  const { userId } = req.params;
  if (userId !== req.user._id && !req.user.isAdmin) return res.sendStatus(403);
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
