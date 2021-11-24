import express from "express";
import { mongodb } from "./mongodb.js";
import cors from "cors";
import { port } from "./config.js";

import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter());

app.get("/", (req, res) => {
  res.send("Hello from artsu.me");
});

app.listen(port, () => console.log("Server listening on port: ", port));

mongodb();
