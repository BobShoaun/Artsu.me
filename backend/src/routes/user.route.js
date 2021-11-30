import express from "express";
import { getUsers } from "../controllers/user.controller.js";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config.js";
import { authenticate } from "../middlewares/user.middleware.js";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  console.log(req.user);
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status;
  }
});

router.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;
  if (!username || !password || !name) return res.sendStatus(400);
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: passwordHash, name });
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    // check if duplicate key error
    if (e.code === 11000) return res.status(409).type("plain").send("Confict: Username Taken");
    res.sendStatus(500);
  }
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) return res.sendStatus(400);
  try {
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(404);
    // authenticate
    if (!(await bcrypt.compare(password, user.password))) return res.sendStatus(401);
    // generate jwt
    const accessToken = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        name: user.name,
        isAdmin: user.isAdmin,
        isBanned: user.isBanned,
      },
      accessTokenSecret,
      { expiresIn: "14d" } // expires in 2 weeks
    );
    const userObj = user.toObject();
    delete userObj.password;
    res.send({ user: userObj, accessToken });
  } catch {
    res.sendStatus(500);
  }
});

export default router;
