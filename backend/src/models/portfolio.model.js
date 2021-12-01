import mongoose from "mongoose";

const { Schema } = mongoose;

const portfolio = new Schema(
  {
    userId: { type: Schema.ObjectId, required: true, ref: "users", unique: true, immutable: true },
    color: {
      primary: { type: String, required: true, default: "#ffffff" },
      secondary: { type: String, required: true, default: "#ffffff" },
      highlight: { type: String, required: true, default: "#ffffff" },
    },
    section: {
      hero: {
        heading: { type: String },
        isVisible: { type: Boolean, required: true, default: true },
      },
      about: {
        biography: { type: String },
        isVisible: { type: Boolean, required: true, default: true },
      },
      experience: {
        layoutId: { type: Number },
        experiences: [
          {
            company: { type: String },
            position: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            artworkIds: [{ type: Schema.ObjectId, ref: "artworks", unique: true }],
          },
        ],
        isVisible: { type: Boolean, required: true, default: true },
      },
      project: {
        layoutId: Number,
        artworkIds: [{ type: Schema.ObjectId, ref: "artworks", unique: true }],
        isVisible: { type: Boolean, required: true, default: true },
      },
      contact: {
        email: { type: String },
        isVisible: { type: Boolean, required: true, default: true },
      },
    },
  },
  { versionKey: false, timestamps: true }
);

export default portfolio;
