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
    const { pathname, query } = parsedUrl

    if (pathname === '/api/activation') {
        console.log(res.body)
        mailer({ email:'supri.contact@gmail.com', name:"", text: "hello" }).then(() => {
            console.log('success')
            res.write('success')
          }).catch((error) => {
            console.log('failed', error)
            res.write('badddd')
          })
    } else {
      handle(req, res, parsedUrl)
    }

  }).listen(server_port,server_host, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:' + server_port)
  })
})