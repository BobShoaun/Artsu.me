import express from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from artsu.me");
});

app.listen(port, () => console.log("Server listening on port: ", port));
