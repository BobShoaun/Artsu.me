import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";

export const errorHandler = (err, req, res, next) => {};

export const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  try {
    const user = await jwt.verify(accessToken, accessTokenSecret);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
};

/**
 * Supports JSON patch format
 * Operations: replace
 */
export const validateJsonPatch = async (req, res, next) => {
  const actions = req.body;
  if (!Array.isArray(actions)) return res.sendStatus(400);
  for (const action of actions) {
    switch (action.op) {
      case "replace":
        continue;
      case "add":
      case "remove":
      case "copy":
      case "move":
      case "test":
        return res.sendStatus(501);
      default:
        return res.sendStatus(400);
    }
  }
  next();
};
