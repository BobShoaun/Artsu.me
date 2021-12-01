export const isMongoError = error =>
  typeof error === "object" && error?.name === "MongoNetworkError";
