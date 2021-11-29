import mongoose from "mongoose";

const artworkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    summary: { type: String, required: true, minlength: 1 },
    description: { type: String, required: true},
    image: String,
    userId: {type: String, required: true},
    likes: {type: mongoose.Schema.ObjectId, default: []}, // array of userIds
    tagIds: {type: mongoose.Schema.ObjectId, default: []},
    isBanned: {type: Boolean, default: false},
    reports: {type: Array, default:[]}
  }
);

export default artworkSchema;
