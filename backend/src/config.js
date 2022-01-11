import dotenv from "dotenv";

dotenv.config();

const mongoUsername = process.env.MONGO_USERNAME;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDatabase = process.env.MONGO_DATABASE;

export const getMongoURI = database =>
  `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.b86oe.mongodb.net/${database}?retryWrites=true&w=majority`;

export const port = process.env.PORT || 3001;
export const mongoURI = getMongoURI(mongoDatabase);
export const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
export const cloudinaryName = process.env.CLOUDINARY_NAME;
export const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
export const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;
export const googleClientId = process.env.GOOGLE_CLIENT_ID;
