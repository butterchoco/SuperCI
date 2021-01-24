const {createServer} = require('http')
const next = require('next')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const nodemailer = require('nodemailer')
const emailTemplate = require('./util/template')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS
    }
})

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
            const response = Buffer.concat(body).toString()
            const {email, name} = JSON.parse(response)
            console.log(email, name)

            const message = {
              from: process.env.NODEMAILER_EMAIL,
              to: email,
              subject: `[PENTING] Aktivasi akun kamu sekarang`,
              html: emailTemplate,
            }

            console.log(process.env.NODEMAILER_EMAIL)

            transporter.sendMail(message, () =>
              res.end()
            )
        })
    } else {
      handle(req, res, parsedUrl)
    }

  }).listen(server_port,server_host, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:' + server_port)
  })
})