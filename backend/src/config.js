import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3001;
export const mongoURI = process.env.MONGO_URI;
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
