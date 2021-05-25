const logger = require("../util/Log/logger");

const createSocketConnection = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", ({ roomId }) => {
      socket.room = roomId;
      socket.join({ roomId });
      logger.debug.debug(
        `User (${socket.id}) connected to room ${socket.room}`
      );
    });

    socket.on("disconnection", function () {
      destroy();
    });

    function destroy() {
      try {
        socket.disconnect();
        socket.removeAllListeners();
        socket = null;
      } catch {}
    }
  });
};

module.exports = createSocketConnection;
