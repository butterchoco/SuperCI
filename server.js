const routes = require("./routes/index");

const server = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  var server_port = process.env.PORT || 3000;
  var server_host = process.env.HOSTNAME || "0.0.0.0";
  server
    .createServer((req, res) => routes(req, res, app))
    .listen(server_port, server_host, (err) => {
      if (err) throw err;
      console.log("> Read on http://localhost:" + server_port);
    });
});
