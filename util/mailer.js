const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "qwertyvisual.contact@gmail.com",
      pass: "MemulaiYangBaru2121"
    }
})

const send = ({ email, text }) => {
  const recipient = email.split("@")[0]
  const message = {
    from: "noreply@qwertyvisual.com",
    to: recipient,
    subject: `[PENTING] Aktivasi akun kamu untuk melanjutkan!`,
    text,
    replyTo: "qwertyvisual.contact@gmail.com"
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send