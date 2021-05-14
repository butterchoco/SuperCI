const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const createSocketConnection = require("./socket.io/index");
const router = require("./routes/index");
const logger = require("./util/Log/logger");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const createError = require("http-errors");

var whitelist = ["*"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

createSocketConnection(io);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", router);
app.use(logger.express);
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.use((req, res, next) => next(createError(404)));
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500).render("error");
});

module.exports = app;
