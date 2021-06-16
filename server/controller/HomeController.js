const logger = require("../util/Log/logger");
const { APP_NAME } = require("../util/Constants");

const HomeController = (_, res) => {
  logger.debug.debug("Route to home");
  res.send("Welcome to " + APP_NAME);
};

module.exports = HomeController;
