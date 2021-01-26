const ActivationController = require("../controller/ActivationController");

const routes = (server) => {
  server.post("/activation", ActivationController)
};

module.exports = routes;
