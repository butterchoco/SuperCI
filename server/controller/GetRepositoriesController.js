const logger = require("../util/Log/logger");
var fetch = require("node-fetch");

const GetRepositoriesController = async (req, res) => {
  logger.debug.debug("Getting Repositories");
  const token = req.headers["authorization"];

  console.log(req.headers);
  console.log(token);
  if (!token) return res.status(403).json({ error: "Not Authorize" });
  const promise = await fetch("https://git.supri.dev/api/v1/user/repos", {
    headers: {
      Authorization: token,
    },
  });
  const response = await promise.json();
  res.send(response);
};

module.exports = GetRepositoriesController;
