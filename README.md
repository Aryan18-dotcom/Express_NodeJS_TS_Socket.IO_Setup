# Express_NodeJS_TS_Socket.IO_Setup
## 🚀 Guide to Using the Express + Node.js + TypeScript + Socket.IO Starter Repo

This guide explains how to properly use and extend the repository:

👉 https://github.com/Aryan18-dotcom/Express_NodeJS_TS_Socket.IO_Setup

It covers setup, project structure, and how to add new Socket.IO features cleanly.

---

## 📦 1. Clone the Repository

Start by cloning the project to your local machine:

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

---

## ⚙️ 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
```

You can extend this later depending on your project needs (e.g., database URLs, API keys, etc.)

---

## ▶️ 4. Run the Server

Start the development server:

```bash
npm run server
```

You should see:

```
Server running at http://localhost:3000
```

---

## 📁 5. Understanding the Project Structure

Here’s a breakdown of how the project is organized and what each part does:

```
├── src/
│   ├── server.ts          # Entry point of the application
│   ├── socket/            # All Socket.IO related logic
│   ├── routes/            # Express routes (if added)
│   ├── controllers/       # Business logic (optional structure)
│   └── utils/             # Helper functions (optional)
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
```

---

## 🧠 6. Core Files Explained

### 🔹 `server.ts`

This is the **main entry point** of your application.

Responsibilities:

* Creates Express app
* Sets up middleware (CORS, JSON parsing)
* Creates HTTP server
* Initializes Socket.IO
* Listens for incoming connections

---

### 🔹 `socket/` Folder

This is where all **real-time features** live.

Think of this folder as the **brain of your WebSocket logic**.

* Each feature should be modular
* Keeps your code clean and scalable
* Avoids putting everything inside `server.ts`

---

## 🔌 7. How Socket.IO Works in This Repo

When a client connects:

* A socket connection is established
* Events are listened using `socket.on(...)`
* Data is sent using `socket.emit(...)` or `io.emit(...)`

---

## 🧩 8. Adding New Socket Features (Recommended Pattern)

To keep things scalable, follow this structure:

```
src/socket/
│
├── index.ts                 # Central socket handler (optional)
├── VideoCalling/            # Feature-based folder
│   ├── index.ts
│   ├── events.ts
│   └── handlers.ts
│
├── Chat/
│   ├── index.ts
│   ├── events.ts
│   └── handlers.ts
```

---

### ✅ Example: Adding a New Feature (Video Calling)

Create a folder:

```
src/socket/VideoCalling/
```

Inside it:

#### `index.ts`

Registers all socket events for this feature

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

### 🔗 Connect Feature to Main Socket

Inside your main socket setup (e.g., in `server.ts` or `socket/index.ts`):

```ts
import { videoCallingHandler } from "./socket/VideoCalling";

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  videoCallingHandler(io, socket);
});
```

---

## 🧱 9. Best Practices

* ✅ Keep `server.ts` clean (no heavy logic)
* ✅ Use **feature-based socket folders**
* ✅ Separate:

  * events
  * handlers
  * constants
* ✅ Use TypeScript interfaces for event data
* ✅ Avoid hardcoding event names (use enums/constants)

---

## 🔄 10. Hot Reload Development

The project uses:

```bash
npm run server
```

Which runs:

* `nodemon` → watches file changes
* `tsx` → runs TypeScript directly

---

## 🏗️ 11. Build for Production

Compile TypeScript:

```bash
npm run build
```

Run compiled code:

```bash
node dist/server.js
```

---

## 🎯 Summary

This repo is designed to:

* Provide a clean Express + Socket.IO setup
* Encourage modular socket architecture
* Make it easy to scale real-time features

---

## 💡 Pro Tip

Whenever you add a new real-time feature:

👉 Create a new folder inside `socket/`
👉 Keep logic isolated
👉 Plug it into the main connection handler

---

You now have a scalable foundation to build:

* Chat apps 💬
* Video calling systems 📹
* Live dashboards 📊
* Multiplayer apps 🎮

Happy coding 🚀


