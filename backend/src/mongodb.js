import mongoose from "mongoose";
import { mongoURI } from "./config.js";

try {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.error("could not connect to mongodb");
}

mongoose.connection.once("open", () => console.log("MongoDB database connection established"));
