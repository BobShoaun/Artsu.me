import app from "./app.js";
import { port } from "./config.js";
import "./mongo.js";

app.listen(port, () => console.log("Server listening on port: ", port));
