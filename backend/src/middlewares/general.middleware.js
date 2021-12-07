/**
 * Validates and Executes a patch with jsonpath input in body
 *
 * req.patchDoc is the document/object to patch
 * req.allowedOperations are operations that are allowed
 * req.allowedPaths are paths that are allowed to be modified
 *
 * some example of valid paths: /hello/world, /hello/world/0/foo, /hello/world/-
 */
export const executeJsonPatch = (req, res, next) => {
  const actions = req.body;
  if (!Array.isArray(actions)) return res.sendStatus(400);

  if (typeof req.patchDoc !== "object") return res.sendStatus(400);
  if (req.allowedPaths?.length <= 0) return res.sendStatus(403);
  if (req.allowedOperations?.length <= 0) return res.sendStatus(403);

  const allowedPathKeys = req.allowedPaths.map(path => path.split("/").filter(key => key));

  for (const action of actions) {
    if (typeof action.path !== "string") return res.sendStatus(400);
    if (!("path" in action)) return res.sendStatus(400);

    // VALIDATED OPERATION
    // check if any VALID ops are passed in, so we can show its unimplemented (501) instead of bad request (400)
    switch (action.op) {
      case "replace":
      case "add":
        if (!("value" in action)) return res.sendStatus(400);
        break;
      case "remove":
        break;
      case "copy":
      case "move":
      case "test":
        return res.sendStatus(501); // not implemented
      default:
        return res.sendStatus(400);
    }

    // check if ops are allowed by us
    if (!req.allowedOperations.includes(action.op)) return res.sendStatus(403);

    // VALIDATE PATH
    const keys = action.path.split("/").filter(key => key);

    let hasMatchingAllowedPath = false;
    outer: for (const allowedKeys of allowedPathKeys) {
      const n = Math.min(allowedKeys.length, keys.length);
      for (let i = 0; i < n; i++) {
        if (allowedKeys[i] === "*") {
          // wildcard path, allow all paths beyond this
          hasMatchingAllowedPath = true;
          break outer;
        }

        if (allowedKeys[i] !== keys[i])
          // not same path, check next allowedPathKeys
          break;

        if (i === n - 1) {
          // last iteration
          hasMatchingAllowedPath = true;
          break outer;
        }
      }
    }

    if (!hasMatchingAllowedPath) return res.sendStatus(403);
  }

  /* DONE validation, now patch the document */
  for (const action of actions) {
    let patchDoc = req.patchDoc;
    const keys = action.path.split("/").filter(key => key);

    // traverse path
    for (const key of keys.slice(0, -1)) {
      if (typeof patchDoc !== "object") return res.sendStatus(400);
      if (!(key in patchDoc)) return res.sendStatus(400);
      patchDoc = patchDoc[key];
    }
    const lastKey = keys[keys.length - 1];

    // do op specific instructions
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
          // - means insert at the end of array
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
