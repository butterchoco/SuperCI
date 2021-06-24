const logger = require("../util/Log/logger");
var fetch = require("node-fetch");

const GetHooksController = async (req, res) => {
  const { owner, repo } = req.params;

  logger.debug.debug("Getting Hooks");
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });
  const promise = await fetch(
    `https://git.supri.dev/api/v1/repos/${owner}/${repo}/hooks`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const response = await promise.json();
  res.send(response);
};

module.exports = GetHooksController;
