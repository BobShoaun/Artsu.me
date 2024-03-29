import mongoose from "mongoose";

const { Schema } = mongoose;

const user = new Schema(
  {
    email: { type: String, required: true, minlength: 1, unique: true },
    givenName: { type: String, required: true, minlength: 1, trim: true },
    familyName: { type: String, required: true, minlength: 1, trim: true },
    username: {
      type: String,
      // required: true,
      unique: true,
      sparse: true, // so that it is unique ONLY IF username exists.
      // minlength: 1,
      validate: {
        validator: value => !/\s/g.test(value),
        message: ({ value }) => `${value} contains whitespaces`,
      },
    },
    password: { type: String },
    providerId: { type: String },
    provider: { type: String },
    avatarUrl: { type: String },
    avatarId: { type: String },
    // followerIds: [{ type: Schema.ObjectId, required: true, ref: "users", immutable: true }],
    // followingIds: [{ type: Schema.ObjectId, required: true, ref: "users", immutable: true }],
    isFeatured: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }, // whether user is email verified
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        delete ret.password; // never send over password
      },
    },
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password; // never send over password
      },
    },
  }
);

user.index({ givenName: "text", familyName: "text", username: "text" });

export default user;
