const logger = require("../util/Log/logger");
const { fetchGet } = require("../util/Helper/optional");

const GetHooksController = async (req, res) => {
  logger.debug.debug("Getting Hooks");
  const { owner, repo } = req.params;

  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });

  const response = await fetchGet(`/repos/${owner}/${repo}/hooks`, {
    Authorization: token,
  })
    .then((res) => res)
    .catch((e) => e);

  res.send(response);
};

module.exports = GetHooksController;