import { ObjectId } from "mongodb";

/**
 * Supports JSON patch format
 * Operations: replace, add
 */
export const validateJsonPatch = (req, res, next) => {
  const actions = req.body;
  if (!Array.isArray(actions)) return res.sendStatus(400);
  for (const action of actions) {
    if (typeof action.path !== "string") return res.sendStatus(400);
    switch (action.op) {
      case "replace":
      case "add":
        if (!("value" in action)) return res.sendStatus(400);
        continue;
      case "remove":
        continue;
      case "copy":
      case "move":
      case "test":
        return res.sendStatus(501); // not implemented
      default:
        return res.sendStatus(400);
    }
  }
  next();
};

export const validateIdParams =
  (...args) =>
  (req, res, next) => {
    for (const arg of args) {
      const id = req.params[arg];
      if (!ObjectId.isValid(id)) return res.sendStatus(400);
    }
    next();
  };
