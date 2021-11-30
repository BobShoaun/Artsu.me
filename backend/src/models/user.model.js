import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    username: { type: String, required: true, unique: true, minlength: 1 },
    password: { type: String, required: true, minlength: 1 },
    avatar: String,
    followers: { type: [mongoose.Schema.ObjectId], required: true, default: [] },
    isFeatured: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
  },
  { versionKey: false }
);

export default userSchema;
