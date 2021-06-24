const logger = require("../util/Log/logger");
const { APP_NAME } = require("../util/Constants");
var { exec } = require("child_process");
var fetch = require("node-fetch");

const CreateHooksController = async (req, res) => {
  logger.debug.debug("Route to home");
  const token = "707f35e44e362069a9fd62e688a12accd80467ae";
  const promise = await fetch("https://git.supri.dev/api/v1/user/repos", {
    headers: {
      Authorization: "token " + token,
    },
  });
  const response = await promise.json();
  console.log(response);
  res.send({ success: "true" });
};

module.exports = CreateHooksController;
