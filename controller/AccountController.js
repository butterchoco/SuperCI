const ActivationController = (request, response) => {
  response.write("test");
  response.end();
};

module.exports = ActivationController;
