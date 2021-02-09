const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const next = require("next");
const bot = require("./util/bot");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const ActivationController = require("./controller/ActivationController");

io.on("connection", (socket) => {
  socket.on("bot.start", (data) => {
    bot(socket, data);
  });
});

nextApp.prepare().then(() => {
  app.get("/api/activation", (req, res) => {
    res.status(200).send({ test: "test" });
    res.end();
  });
  app.post("/api/activation", ActivationController);

  app.get("*", (req, res) => {
    return nextHandler(req, res);
  });

  var server_port = process.env.PORT || 3000;
  server.listen(server_port, (err) => {
    if (err) throw err;
    console.log("> Read on http://localhost:" + server_port);
  });
});
