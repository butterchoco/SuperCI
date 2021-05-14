const logger = require("../util/Log/logger");

const HomeController = (_, res) => {
  logger.debug.debug("Route to home");
  res.status(200).send("Hello World");
};

module.exports = HomeController;
