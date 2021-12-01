import mongoose from "mongoose";

const { Schema } = mongoose;

const user = new Schema(
  {
    name: { type: String, required: true, minlength: 1 },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      validate: {
        validator: value => !/\s/g.test(value),
        message: ({ value }) => `${value} contains whitespaces`,
      },
    },
    password: { type: String, required: true, minlength: 1 },
    avatar: String,
    followerIds: [{ type: Schema.ObjectId, required: true, ref: "users", immutable: true }],
    followingIds: [{ type: Schema.ObjectId, required: true, ref: "users", immutable: true }],
    isFeatured: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
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

export default user;
