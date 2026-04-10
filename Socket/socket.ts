import { Server as HTTPServer } from "http";
import { Server, Socket } from "socket.io";
import registerGenericHandlers from "./Handlers/genericHandler.js";

export function initSocket(server: HTTPServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "*",
      methods: ["GET", "POST"]
    },
    // Industry Tip: Standardize these for stability
    connectionStateRecovery: {}, // Reconnects without losing state
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  // 1. Connection Middleware (Auth)
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    // Add your JWT logic here
    next();
  });

  // 2. Main Connection Logic
  io.on("connection", (socket: Socket) => {
    const transportType = socket.conn.transport.name; // 'polling' or 'websocket'
    console.log(`[socket] Connected: ${socket.id} via ${transportType}`);
    io.to(socket.id).emit("welcome", `Welcome ${socket.id}! Connected via ${transportType}`);

    // Register all your feature handlers here
    registerGenericHandlers(io, socket);

    // 3. System Events
    socket.on("error", (err) => {
      console.error(`Socket Error for ${socket.id}:`, err);
    });

    socket.on("disconnect", (reason) => {
      console.log(`[socket] User ${socket.id} left. Reason: ${reason}`);
    });
  });

  return io;
}