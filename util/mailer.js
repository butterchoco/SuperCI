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
    from: "noreply@qwertyvisual.com",
    to: email,
    subject: `[PENTING] Aktivasi akun kamu sekarang`,
    html: `<html lang="en">
    <head>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: sans-serif;
        }
        .container {
            margin: auto;
            max-width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.06);
            border: 1px solid rgba(0, 0, 0, 0.06);
        }
        .header {
            background: linear-gradient(45deg, #a18ff3, #4078df);
            width: 100%;
            text-align: center;
            padding: 4rem;
            color: white;
        }
        .content {
            padding: 4rem;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Hi, Qwertizen!</h1>
            </div>
            <div class="content">
                <p>Terima kasih sudah menghubungi kami. Silahkan tunggu 7 hari kerja untuk melakukan aktivasi akun.</p>
                <br/>
                <hr/>
                <p>Pesan ini disampaikan oleh <a href="https://www.instagram.com/qwertyvisual/">Qwerty Visual</a>.</p>
            </div>
        </div>
    </body>
    </html>`,
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