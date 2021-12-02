import mongoose from "mongoose";
import { ObjectId } from "mongodb";

/**
 * Check if database connection is healthy
 * @returns
 */
export const checkDatabaseConn = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) return res.sendStatus(500);
  next();
};

export const validateIdParam = (req, res, next, id) => {
  if (!ObjectId.isValid(id)) return res.sendStatus(400);
  next();
};

export const mongoHandler = (err, req, res, next) => {
  if (isMongoError(err)) return res.sendStatus(500);
  res.sendStatus(400);
};
