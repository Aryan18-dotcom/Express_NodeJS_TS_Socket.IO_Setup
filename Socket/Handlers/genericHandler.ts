import { Server, Socket } from "socket.io";

// This function acts as a "Plugin" for your socket server
export default (io: Server, socket: Socket) => {
  
  // 1. Define the logic
  const pingBack = () => {
    socket.emit("pong", { message: "Server is alive!" });
  };

  const handleGlobalAnnounce = (data: { msg: string }) => {
    // Send to everyone connected
    io.emit("announcement", data.msg);
  };

  // 2. Register the listeners to the socket
  socket.on("ping", pingBack);
  socket.on("announce", handleGlobalAnnounce);
};