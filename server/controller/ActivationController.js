const EmailTemplate = require("../util/Email/Template");
const SendMail = require("../util/Email/SendMail");

const ActivationController = (req, res) => {
  const { email } = req.body;

  SendMail(
    email,
    "[PENTING] Aktivasi akun kamu sekarang",
    "",
    EmailTemplate,
    () => {
      res.end();
    }
  );
};

module.exports = ActivationController;
