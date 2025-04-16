import error from "../utilities/error.mjs";

// Valid API Keys.
const apiKeys = ['perscholas', 'ps-example', 'hJAsknw-L198sAJD-l3kasx'];

export default function (req, res, next) {
  var key = req.query["api-key"];

  // Check for the absence of a key.
  if (!key) return next(error(400, "API Key Required"));

  // Check for key validity.
  if (apiKeys.indexOf(key) === -1) return next(error(401, "Invalid API Key"));

  // Valid key! Store it in req.key for route access.
  req.key = key;
  next();
}
