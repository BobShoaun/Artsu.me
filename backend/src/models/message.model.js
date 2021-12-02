import mongoose from "mongoose";

const { Schema } = mongoose;

const message = new Schema(
  {
    senderId: {type: Schema.ObjectId, required: true, ref: "users", immutable: true },
    receiverId: {type: Schema.ObjectId, required: true, ref: "users", immutable: true },
    subject: { type: String, required: true, minlength: 1 },
    body: { type: String, required: true, minlength: 1 },
    hasRecipientRemoved: {type: Boolean, default: false},
  },
  { versionKey: false, timestamps: true }
);

export default message;
