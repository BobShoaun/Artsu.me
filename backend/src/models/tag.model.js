import mongoose from "mongoose";

const { Schema } = mongoose;

const tag = new Schema(
  {
    label: { type: String, required: true, unique: true, minlength: 1 },
    color: { type: String, required: true, default: "#ffffff" },
  }
);

export default tag;
