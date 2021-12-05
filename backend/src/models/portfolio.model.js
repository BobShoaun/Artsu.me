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

// TODO: check if duplicate artworkId

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
        subtitle: { type: String },
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
            _id: false, // no ids for experience
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
        isVisible: { type: Boolean, required: true, default: true },
      },
      project: {
        layoutId: Number,
        artworkIds: [
          {
            type: Schema.ObjectId,
            ref: "artworks",
            validate: [artworkExistValidator, artworkArtistValidator],
          },
        ],
        isVisible: { type: Boolean, required: true, default: true },
      },
      contact: {
        email: { type: String },
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
