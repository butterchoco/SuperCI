const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const createSocketConnection = require("./socket.io/index");
const router = require("./routes/index");
const logger = require("./util/Log/logger");

createSocketConnection(io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", router);
app.use(logger.express);

module.exports = app;
