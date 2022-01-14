import mongoose from "mongoose";
import user from "./user.model.js";
import portfolio from "./portfolio.model.js";
import tag from "./tag.model.js";
import artwork from "./artwork.model.js";
import message from "./message.model.js";
import token from "./token.model.js";

export const User = mongoose.model("users", user);
export const Portfolio = mongoose.model("portfolios", portfolio);
export const Tag = mongoose.model("tags", tag);
export const Artwork = mongoose.model("artworks", artwork);
export const Message = mongoose.model("messages", message);
export const Token = mongoose.model("tokens", token);
