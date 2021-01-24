const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS
    }
})

const send = ({ email, name }) => {
  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const message = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `[PENTING] Aktivasi akun kamu sekarang`,
    text: "Selamat datang",
    replyTo: from
  }
  console.log(process.env.NODEMAILER_EMAIL)

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send