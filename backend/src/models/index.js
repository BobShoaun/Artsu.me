import mongoose from "mongoose";
import user from "./user.model.js";
import portfolio from "./portfolio.model.js";

export const User = mongoose.model("users", user);
export const Portfolio = mongoose.model("portfolios", portfolio);
