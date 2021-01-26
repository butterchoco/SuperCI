const ActivationController = require("../controller/ActivationController");
const AccountController = require("../controller/AccountController");

const { parse } = require("url");
let handle;
let parsedUrl;
let request;
let response;
const routes = (req, res, app) => {
  console.log(req.url);
  parsedUrl = parse(req.url, true);
  handle = app.getRequestHandler();
  request = req;
  response = res;

  if (checkPath("/api/activation")) ActivationController(req, res);
  else if (checkPath("/api/account")) AccountController(req, res);
  else handle(request, response, parsedUrl);
};

const checkPath = (expectedPath) => {
  const { pathname } = parsedUrl;
  return pathname === expectedPath ? true : false;
};

module.exports = routes;
