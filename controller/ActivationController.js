const emailTemplate = require("../util/template");
const SendMail = require("../util/SendMail");

const ActivationController = (req, res) => {
  const { email } = req.body;

  SendMail(
    email,
    "[PENTING] Aktivasi akun kamu sekarang",
    "",
    emailTemplate,
    () => {
      res.end();
    }
  );
};

module.exports = ActivationController;
