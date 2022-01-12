import mongoose from "mongoose";

const { Schema } = mongoose;

const token = new Schema(
  {
    value: { type: String, required: true, unique: true, minlength: 1 },
    userId: { type: Schema.ObjectId, ref: "users", required: true, unique: true, immutable: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

token.virtual("user", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

export default token;
