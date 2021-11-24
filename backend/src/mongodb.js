import mongoose from "mongoose";
import { atlasURI } from "./config.js";

export const mongodb = () => {
  try {
    mongoose.connect(atlasURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error("could not connect to mongodb");
  }

  mongoose.connection.once("open", () =>
    console.log("MongoDB database connection established")
  );
};
