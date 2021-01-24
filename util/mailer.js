const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "supri.contact@gmail.com",
      pass: "isTiGHfar3x"
    }
})

const send = ({ email }) => {
  const recipient = email.split("@")[0]
  const message = {
    from: "noreply@qwertyvisual.com",
    to: recipient,
    subject: `[PENTING] Aktivasi akun kamu untuk melanjutkan!`,
    text: "Selamat anda sudah berhasil mengaktivasi akun.",
    replyTo: "qwertyvisual.contact@gmail.com"
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) =>
      error ? reject(error) : resolve(info)
    )
  })
}

module.exports = send