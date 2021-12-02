import express from "express";
import cors from "cors";

import authenticationRoutes from "./routes/authentication.route.js";
import userRoutes from "./routes/user.route.js";
import portfolioRoutes from "./routes/portfolio.route.js";
import tagRoutes from "./routes/tag.route.js";
import artworkRoutes from "./routes/artwork.route.js";
import testImageRoutes from "./routes/testImage.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(authenticationRoutes);
app.use(userRoutes);
app.use(portfolioRoutes);
app.use(tagRoutes);
app.use(artworkRoutes);
app.use(testImageRoutes);

app.get("/", (req, res) => res.send("Hello from artsu.me"));
app.all("*", (req, res) => res.sendStatus(404));

export default app;
