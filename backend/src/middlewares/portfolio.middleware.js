export const artworkHandler = async (err, req, res, next) => {
  if (err.name === "ValidationError")
    return res.status(400).type("plain").send(`Bad Request: ${err.message}`);
  next(err);
};
