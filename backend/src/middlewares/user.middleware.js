import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";

const errorHandler = (err, req, res, next) => {};

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader?.split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  try {
    const user = await jwt.verify(accessToken, accessTokenSecret);
    req.user = user;
    next();
  } catch {
    res.sendStatus(403);
  }
};
