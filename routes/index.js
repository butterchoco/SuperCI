const ActivationController = require("../controller/ActivationController");
const BotSiakWarController = require("../controller/BotSiakWarController");

const routes = (server) => {
  server.post("/activation", ActivationController);
  server.post("/start-bot", BotSiakWarController);
};

module.exports = routes;
