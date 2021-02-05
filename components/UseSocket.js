import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(process.env.FRONTEND_URL);

    setSocket(socketIo);

    const cleanup = () => {
      socketIo.disconnect();
    };
    return cleanup;
  }, []);

  return socket;
};

export default useSocket;
