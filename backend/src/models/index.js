import mongoose from "mongoose";
import userSchema from "./user.model";

export const User = mongoose.model("users", userSchema);
