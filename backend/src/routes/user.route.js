import express from "express";
import { getUser } from "../controllers/user.controller";

const userRouter = () => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    const user = await getUser();
  });
};

export default userRouter;
