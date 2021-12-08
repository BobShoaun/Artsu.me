import mongoose from "mongoose";
import { Artwork } from "./index.js";

const { Schema } = mongoose;

const artworkExistValidator = {
  validator: async value => await Artwork.exists({ _id: value }),
  message: ({ value }) => `${value} does not exist as an artwork`,
};

const artworkArtistValidator = {
  validator: async function (value) {
    const artwork = await Artwork.findById(value);
    return artwork.userId.equals(this.userId);
  },
  message: ({ value }) => `${value} userId does not belong to portfolio's userId`,
};

const portfolio = new Schema(
  {
    userId: { type: Schema.ObjectId, required: true, ref: "users", unique: true, immutable: true },
    color: {
      primary: { type: String, required: true, default: "#FB7185" },
      secondary: { type: String, required: true, default: "#14B8A6" },
      highlight: { type: String, required: true, default: "#F59E0B" },
    },
    section: {
      hero: {
        layoutId: { type: Number, default: 0 },
        heading: { type: String, default: "" },
        subtitle: { type: String, default: "" },
        isVisible: { type: Boolean, required: true, default: true },
      },
      about: {
        biography: { type: String },
        isVisible: { type: Boolean, required: true, default: true },
      },
      experience: {
        layoutId: { type: Number, default: 0 },
        experiences: [
          {
            company: { type: String },
            position: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String },
            artworkIds: [
              {
                type: Schema.ObjectId,
                ref: "artworks",
                validate: artworkExistValidator,
              },
            ],
          },
        ],
        isVisible: { type: Boolean, required: true, default: false },
      },
      project: {
        layoutId: { Number, default: 0 },
        artworkIds: [
          {
            type: Schema.ObjectId,
            ref: "artworks",
            validate: [artworkExistValidator, artworkArtistValidator],
          },
        ],
        isVisible: { type: Boolean, required: true, default: false },
      },
      contact: {
        isVisible: { type: Boolean, required: true, default: true },
      },
    },
  },
  { versionKey: false, timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

portfolio.virtual("user", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

portfolio.virtual("section.project.artworks", {
  ref: "artworks",
  localField: "section.project.artworkIds",
  foreignField: "_id",
});
export default portfolio;
