import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    summary: { type: String, required: true, minlength: 1 },
    description: { type: String, required: true},
    image: String,
    userId: {type: String, required: true},
    likes: [{ type: Schema.ObjectId, required: true, ref: "users"}], // array of userIds
    tagIds: [{ type: Schema.ObjectId, required: true, ref: "tags"}],
    isBanned: {type: Boolean, default: false},
    reports: {type: Array, default:[]}
  },
  {
      versionKey: false, timestamps: true
  }
);

export default artworkSchema;
