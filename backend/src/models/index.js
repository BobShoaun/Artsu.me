import mongoose from "mongoose";
import userSchema from "./user.model.js";

export const User = mongoose.model("users", userSchema);
