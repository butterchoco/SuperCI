const path = require("path");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const createSocketConnection = require("./socket.io/index");
const router = require("./routes/index");
const logger = require("./util/Log/logger");
var cookieParser = require("cookie-parser");
var cors = require("cors");

const corsOptions = { origin: "*" };
const io = require("socket.io")(server, {
  cors: corsOptions,
});
createSocketConnection(io);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger.express);
app.use(cookieParser());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("hello");
});

module.exports = app;
