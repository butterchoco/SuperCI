const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const createSocketConnection = require("./socket.io/index");
const router = require("./routes/index");

createSocketConnection(io);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", router);

module.exports = app;
