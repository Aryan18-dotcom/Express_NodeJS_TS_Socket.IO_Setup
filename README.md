# Express_NodeJS_TS_Socket.IO_Setup
## 🚀 Complete Guide to Using the Express + Node.js + TypeScript + Socket.IO Repo

This guide explains **how to properly use, run, and extend** the following repository:

👉 https://github.com/Aryan18-dotcom/Express_NodeJS_TS_Socket.IO_Setup

This repo is a **starter boilerplate for building real-time applications** using **Express + Socket.IO + TypeScript**, which enables bidirectional communication between client and server. ([expresswebjs.hashnode.dev][1])

---

## 📦 1. Clone the Repository

First, clone the project to your local machine:

```bash
git clone https://github.com/Aryan18-dotcom/Express_NodeJS_TS_Socket.IO_Setup.git
```

```bash
cd Express_NodeJS_TS_Socket.IO_Setup
```

---

## 📥 2. Install Dependencies

Install all required packages:

```bash
npm install
```

This installs:

* Express (backend framework)
* Socket.IO (real-time communication)
* TypeScript + typings
* Development tools (tsx, nodemon, etc.)

---

## ⚙️ 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

You can later extend this with:

* Database URLs
* API keys
* JWT secrets

---

## ▶️ 4. Run the Server

Start the development server:

```bash
npm run server
```

Expected output:

```bash
Server running at http://localhost:3000
```

Now open:
👉 http://localhost:3000

---

## 🧠 5. How This Repo Works (Core Flow)

This project combines:

* **Express** → Handles HTTP APIs
* **HTTP Server** → Wraps Express
* **Socket.IO** → Adds WebSocket layer

Typical flow:

1. Express app is created
2. HTTP server is created using Express
3. Socket.IO is attached to that server
4. Clients connect using sockets
5. Events are sent/received in real-time

This pattern is standard for Socket.IO apps. ([thiscodeworks.com][2])

---

## 📁 6. Project Structure Explained

```bash
src/
├── server.ts          # Main entry point
├── socket/            # All socket-related logic
│
├── routes/            # (Optional) Express routes
├── controllers/       # (Optional) Business logic
└── utils/             # Helpers
```

---

## 🔹 7. Important Files Explained

### ✅ `server.ts`

This is the **heart of the application**.

It does:

* Creates Express app
* Applies middleware (CORS, JSON)
* Creates HTTP server
* Initializes Socket.IO
* Handles connections

---

### ✅ `socket/` Folder (VERY IMPORTANT)

This is where all your **real-time features live**.

👉 Instead of writing everything in `server.ts`,
👉 you **modularize features here**

---

## 🔌 8. How Socket Events Work

Basic Socket.IO pattern:

```ts
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("event-name", (data) => {
    // handle event
  });

  socket.emit("event-name", data);
});
```

* `socket.on()` → listen
* `socket.emit()` → send to one client
* `io.emit()` → broadcast to all

---

## 🧩 9. How to Add New Features (Best Practice)

👉 Always follow **feature-based architecture**

### Example:

```bash
src/socket/
├── Chat/
├── VideoCalling/
├── Notifications/
```

---

### 🔧 Example: Create a New Feature (VideoCalling)

```bash
src/socket/VideoCalling/
```

---

### Step 1: Add Handler

```ts
export const videoCallingHandler = (io: any, socket: any) => {
  socket.on("call-user", (data) => {
    io.to(data.to).emit("incoming-call", data);
  });

  socket.on("accept-call", (data) => {
    io.to(data.to).emit("call-accepted", data);
  });
};
```

---

### Step 2: Connect It to Main Socket

In your main socket setup:

```ts
import { videoCallingHandler } from "./socket/VideoCalling";

io.on("connection", (socket) => {
  videoCallingHandler(io, socket);
});
```

---

## 🧱 10. Recommended Scalable Structure

As your app grows:

```bash
src/socket/
├── index.ts                # central socket loader
│
├── Chat/
│   ├── events.ts
│   ├── handlers.ts
│   └── index.ts
│
├── VideoCalling/
│   ├── events.ts
│   ├── handlers.ts
│   └── index.ts
```

---

## 🧠 11. Best Practices

* ✅ Keep `server.ts` clean
* ✅ Use **modular socket features**
* ✅ Separate:

  * events
  * handlers
  * constants
* ✅ Use TypeScript types/interfaces
* ✅ Avoid hardcoding event names

---

## 🔄 12. Development Workflow

```bash
npm run server
```

Uses:

* `nodemon` → auto-restart server
* `tsx` → run TypeScript directly

---

## 🏗️ 13. Build for Production

```bash
npm run build
```

```bash
node dist/server.js
```

---

## 🎯 Summary

This repo gives you:

* ⚡ Express backend setup
* 🔌 Real-time communication with Socket.IO
* 🧩 Scalable architecture using feature-based sockets
* 🔥 Fast dev workflow with TypeScript

---

## 💡 Final Tip

Whenever you build a new real-time feature:

👉 Create a folder inside `socket/`
👉 Keep logic isolated
👉 Plug it into the main connection

---

Now you’re ready to build:

* Chat apps 💬
* Video calling apps 📹
* Live dashboards 📊
* Multiplayer apps 🎮

Happy coding 🚀

[1]: https://expresswebjs.hashnode.dev/building-real-time-application-with-socketio-and-expresswebjs?utm_source=chatgpt.com "Building Real-Time Application with Socket.io and ExpressWebJs"
[2]: https://www.thiscodeworks.com/611d368dc18a110014ce6965?utm_source=chatgpt.com "socket IO setup (express server) | thiscodeWorks"
