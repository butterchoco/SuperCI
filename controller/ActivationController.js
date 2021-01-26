const nodemailer = require("nodemailer");

const emailTemplate = require("../util/template");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS,
  },
});

const ActivationController = (request, response) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  return req.on("end", () => {
    const response = Buffer.concat(body).toString();
    const { email, name } = JSON.parse(response);

    const message = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: `[PENTING] Aktivasi akun kamu sekarang`,
      html: emailTemplate,
    };

    transporter.sendMail(message, () => res.end());
  });
};

module.exports = ActivationController;
