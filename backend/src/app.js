import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authenticationRoutes from "./routes/authentication.route.js";
import userRoutes from "./routes/user.route.js";
import portfolioRoutes from "./routes/portfolio.route.js";
import tagRoutes from "./routes/tag.route.js";
import artworkRoutes from "./routes/artwork.route.js";
import messageRoutes from "./routes/message.route.js";
import imageRoutes from "./routes/image.route.js";
import googleRoutes from "./routes/google.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // only for development

app.use(authenticationRoutes);
app.use(userRoutes);
app.use(portfolioRoutes);
app.use(tagRoutes);
app.use(artworkRoutes);
app.use(messageRoutes);
app.use(imageRoutes);
app.use(googleRoutes);

app.get("/", (_, res) => res.send("Hello from Artsu.me"));
app.all("*", (_, res) => res.sendStatus(404));

export default app;
