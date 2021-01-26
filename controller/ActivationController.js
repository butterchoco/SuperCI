const nodemailer = require("nodemailer");

const emailTemplate = require("../util/template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const ActivationController = (handle, response) => {
  const { email, name } = response;

  const message = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `[PENTING] Aktivasi akun kamu sekarang`,
    html: emailTemplate,
  };

  transporter.sendMail(message, () => handle.end());
};

module.exports = ActivationController;
