/**
 * Supports JSON patch format
 * Operations: replace, add
 */
export const validateJsonPatch = (req, res, next) => {
  const actions = req.body;
  if (!Array.isArray(actions)) return res.sendStatus(400);
  for (const action of actions) {
    if (typeof action.path !== "string") return res.sendStatus(400);
    if (!("path" in action)) return res.sendStatus(400);
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

/**
 * Executes a patch with jsonpath input in body
 *
 * req.patchDoc is the document/object to patch
 * req.forbiddenPaths are forbidden paths not allowed to be patched
 */
export const executeJsonPatch = (req, res, next) => {
  if (typeof req.patchDoc !== "object") return res.sendStatus(400);

  const forbiddenPathKeys =
    req.forbiddenPaths?.map(path => path.split("/").filter(key => key)) ?? [];

  for (const action of req.body) {
    let patchDoc = req.patchDoc;
    const keys = action.path.split("/").filter(key => key);

    // check if keys are forbidden
    for (const forbiddenKeys of forbiddenPathKeys)
      if (JSON.stringify(keys) === JSON.stringify(forbiddenKeys)) return res.sendStatus(403);

    for (const key of keys.slice(0, -1)) {
      if (typeof patchDoc !== "object") return res.sendStatus(400);
      if (!(key in patchDoc)) return res.sendStatus(400);
      patchDoc = patchDoc[key];
    }
    const lastKey = keys[keys.length - 1];

    switch (action.op) {
      case "replace": {
        if (typeof patchDoc !== "object") return res.sendStatus(400);
        if (!(lastKey in patchDoc)) return res.sendStatus(400);
        patchDoc[lastKey] = action.value;
        break;
      }
      case "add": {
        if (!Array.isArray(patchDoc)) return res.sendStatus(400);
        if (lastKey === "-") {
          // - means insert at the end
          patchDoc.push(action.value);
          break;
        }
        const index = parseInt(lastKey); // otherwise insert at specified index
        if (isNaN(index)) return res.sendStatus(400);
        patchDoc.splice(index, 0, action.value);
        break;
      }
      case "remove": {
        if (!Array.isArray(patchDoc)) return res.sendStatus(400);
        const index = parseInt(lastKey);
        if (isNaN(index)) return res.sendStatus(400);
        patchDoc.splice(index, 1);
        break;
      }
      default:
        return res.sendStatus(500); // should not happen, assuming already validated.
    }
  }
  next();
};
