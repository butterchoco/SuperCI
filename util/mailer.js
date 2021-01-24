const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 465,
    auth: {
      user: "e7ff51ea171178",
      pass: "6ac951121a2aaa"
    },
    tls: {
        servername: 'smtp.mailtrap.io'
    }
})

const send = ({ email, name, text }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from,
    to: 'supri.contact@gmail.com',
    subject: `New message from ${from}`,
    text,
    replyTo: from
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send