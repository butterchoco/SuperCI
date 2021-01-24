const {createServer} = require('http')
const next = require('next')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mailer = require('./util/mailer')

app.prepare().then(() => {
var server_port = process.env.PORT || 3000;
var server_host = process.env.HOSTNAME || "0.0.0.0";
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    const body = []
    req.on("data", (chunk) => {
        body.push(chunk);
    })

    if (pathname === '/api/activation') {
        return req.on("end", () => {
            const {email, name} = Buffer.concat(body).toJSON()
            console.log(email, name)
            mailer({ email, name, text: "hello" }).then(() => {
                res.write('Success')
                res.end()
              }).catch((error) => {
                res.write(error)
                res.end()
              })
        })
    } else {
      handle(req, res, parsedUrl)
    }

  }).listen(server_port,server_host, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:' + server_port)
  })
})