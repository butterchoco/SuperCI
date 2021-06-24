const logger = require("../util/Log/logger");
const { fetchGet } = require("../util/Helper/optional");

const GetRepositoryController = async (req, res) => {
  logger.debug.debug("Getting Repositories");

  const { owner, repo } = req.params;

  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });

  const response = await fetchGet(`/repos/${owner}/${repo}`, {
    Authorization: token,
  });

  res.send(response);
};

module.exports = GetRepositoryController;
