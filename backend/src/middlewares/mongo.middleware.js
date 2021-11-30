import mongoose from "mongoose";

export const checkDatabaseConn = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) return res.sendStatus(500);
  next();
};
