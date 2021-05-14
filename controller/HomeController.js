const logger = require("../util/Log/logger");
const { APP_NAME } = require("../util/Constants");

const HomeController = (_, res) => {
  logger.debug.debug("Route to home");
  res.render("pages/index", { AppName: APP_NAME });
};

module.exports = HomeController;
