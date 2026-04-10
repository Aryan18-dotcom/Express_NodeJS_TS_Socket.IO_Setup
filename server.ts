import "dotenv/config";
import express from 'express';
import { createServer } from "http";
import { initSocket } from "./Socket/socket.js"; // Use .js or omit based on config

const app = express();
const httpServer = createServer(app); // The shared heart of the app

// 1. Plugins / Middleware
app.use(express.json());

// 2. Initialize Real-time Service
// We pass the httpServer here so Socket.io can attach to it
initSocket(httpServer);

// 3. REST Routes
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'up', timestamp: new Date() });
});

// 4. Start
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`[server]: Running at http://localhost:${PORT}`);
});