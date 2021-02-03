const bot = require("../util/bot");

const BotSiakWarController = (handle, response) => {
  bot(response)
    .then((res) => {
      handle.statusCode = 200;
      handle.write(JSON.stringify({ data: res }));
    })
    .catch((err) => {
      handle.statusCode = 500;
      handle.write(JSON.stringify({ error: err }));
    })
    .finally(() => {
      handle.end();
    });
};

module.exports = BotSiakWarController;
