const routes = require("./routes/index");
const App = require("./util/AppHandler")

const { createServer } = require("http");
const next = require("next");
const { parse } = require('url')

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  var server_port = process.env.PORT || 3000;
  var server_host = process.env.HOSTNAME || "0.0.0.0";
  const handle = app.getRequestHandler();

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl
    const base = pathname.split("/")[1]
    const server = new App(req, res, `/${base}`);
    
    if (base === "api") {
      routes(server)
    } else {
      handle(req, res, parsedUrl);
    }
  
  })
    .listen(server_port, server_host, (err) => {
      if (err) throw err;
      console.log("> Read on http://localhost:" + server_port);
    });
});
