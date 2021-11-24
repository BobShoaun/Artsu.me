import { User } from "../models/index.js";

export const getUsers = async () => {
  const users = await User.find({});
  return users;
};
