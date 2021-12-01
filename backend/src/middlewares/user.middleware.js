import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";

export const errorHandler = (err, req, res, next) => {};

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
