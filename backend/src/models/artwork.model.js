import mongoose from "mongoose";

const { Schema } = mongoose;

const artwork = new Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    summary: { type: String },
    description: { type: String },
    imageUrl: { type: String, required: true },
    imageId: { type: String, required: true }, // cloudinary id
    userId: { type: Schema.ObjectId, required: true, ref: "users" },
    likes: [{ type: Schema.ObjectId, required: true, ref: "users" }], // array of userIds
    tagIds: [{ type: Schema.ObjectId, required: true, ref: "tags" }],
    isBanned: { type: Boolean, default: false },
    reports: { type: Array, default: [] },
  },
  { versionKey: false, timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

artwork.virtual("user", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
});

export default artwork;
