import express from "express";
import { getUsers } from "../controllers/user.controller.js";

const userRouter = () => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const users = await getUsers();
    res.send(users);
  });

  return router;
};

export default userRouter;
