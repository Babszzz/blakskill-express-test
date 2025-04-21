const fs = require("fs");
const VALID_KEYS_PATH = __dirname + "/valid-keys.txt";

module.exports = function (req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res
      .status(401)
      .json({ status: "failed", message: "API key required" });
  }

  fs.readFile(VALID_KEYS_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading valid keys:", err);
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error" });
    }

    const keys = data.split(/\r?\n/).filter(Boolean); // Remove empty lines
    if (keys.includes(apiKey)) {
      next();
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid API key" });
    }
  });
};
