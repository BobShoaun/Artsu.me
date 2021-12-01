import mongoose from "mongoose";
import { User, Portfolio } from "../models/index.js";
import { getMongoURI } from "../config";

export const setupTestDatabase = databaseName => {
  beforeAll(async () => {
    const mongoURI = getMongoURI(databaseName);
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  beforeEach(async () => {
    await User.deleteMany();
    await Portfolio.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
};

// test if string contents are equal, ignoring whitespaces and newlines
export const isStringContentsEqual = (str1, str2) => {
  expect(str1.replace(/\s+/g, "")).toEqual(str2.replace(/\s+/g, ""));
};
