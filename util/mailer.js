const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "supri.contact@gmail.com",
      pass: "isTiGHfar3x"
    }
})

const send = ({ email, name, text }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from,
    to: 'qwertyvisual.contact@gmail.com',
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