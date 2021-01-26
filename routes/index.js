const ActivationController = require("../controller/ActivationController");
const AccountController = require("../controller/AccountController");
const TestController = require("../controller/TestController");

const routes = (server) => {
  server.post("/activation", ActivationController)
};

module.exports = routes;
