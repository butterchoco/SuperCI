const logger = require("../util/Log/logger");
const { fetchGet } = require("../util/Helper/optional");

const GetRepositoriesController = async (req, res) => {
  logger.debug.debug("Getting Repositories");

  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });

  const response = await fetchGet("/user/repos", {
    Authorization: token,
  });

  res.send(response);
};

module.exports = GetRepositoriesController;
