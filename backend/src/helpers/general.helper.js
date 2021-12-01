export const executeJsonPatch = (req, res, patchDoc, forbiddenPaths = []) => {
  const forbiddenPathKeys = forbiddenPaths.map(path => path.split("/").filter(key => key));

  for (const action of req.body) {
    let _patchDoc = patchDoc;
    const keys = action.path.split("/").filter(key => key);

    // check if keys are forbidden
    for (const forbiddenKeys of forbiddenPathKeys)
      if (JSON.stringify(keys) === JSON.stringify(forbiddenKeys)) return res.sendStatus(403);

    for (const key of keys.slice(0, -1)) {
      if (typeof _patchDoc !== "object") return res.sendStatus(400);
      if (!(key in _patchDoc)) return res.sendStatus(400);
      _patchDoc = _patchDoc[key];
    }
    const lastKey = keys[keys.length - 1];

    switch (action.op) {
      case "replace": {
        if (typeof _patchDoc !== "object") return res.sendStatus(400);
        if (!(lastKey in _patchDoc)) return res.sendStatus(400);
        _patchDoc[lastKey] = action.value;
        break;
      }
      case "add": {
        if (!Array.isArray(_patchDoc)) return res.sendStatus(400);
        if (lastKey === "-") {
          // - means insert at the end
          _patchDoc.push(action.value);
          break;
        }
        const index = parseInt(lastKey); // otherwise insert at specified index
        if (isNaN(index)) return res.sendStatus(400);
        _patchDoc.splice(index, 0, action.value);
        break;
      }
      case "remove": {
        if (!Array.isArray(_patchDoc)) return res.sendStatus(400);
        const index = parseInt(lastKey);
        if (isNaN(index)) return res.sendStatus(400);
        _patchDoc.splice(index, 1);
        break;
      }
      default:
        return res.sendStatus(500); // should not happen, assuming already validated.
    }
  }
};
