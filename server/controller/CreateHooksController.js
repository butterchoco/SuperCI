const logger = require("../util/Log/logger");
const { fetchPost } = require("../util/Helper/optional");
var { exec } = require("child_process");
const { stderr } = require("process");

const CreateHooksController = async (req, res) => {
  logger.debug.debug("CreateHooks");
  const { owner, repo } = req.params;

  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Not Authorize" });

  const body = req.body;
  console.log(body);
  const response = await fetchPost(`/repos/${owner}/${repo}/hooks`, body, {
    Authorization: token,
  })
    .then((res) => res)
    .catch((e) => e);

  if (response.message) return res.status(400).json(response);

  exec(
    `git -C /data/git clone ${process.env.GIT_URL}/${owner}/${repo}.git`,
    execCallback
  );
  res.send(response);
};

function execCallback() {
  if (stdout) console.log(stdout);
  if (stderr) console.log(stderr);
}

module.exports = CreateHooksController;
