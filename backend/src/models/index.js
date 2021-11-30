import mongoose from "mongoose";
import user from "./user.model.js";

export const User = mongoose.model("users", user);
