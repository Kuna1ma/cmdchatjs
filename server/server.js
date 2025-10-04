// server/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const users = {}; // store socket.id → username map

io.on("connection", (socket) => {
  console.log(`✅ ${socket.id} connected`);

  socket.on("joinChat", (username) => {
    users[socket.id] = username;
    console.log(`🟢 ${username} joined`);
    io.emit("systemMessage", `🟢 ${username} joined the chat`);
  });

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    const username = users[socket.id];
    if (username) {
      console.log(`🔴 ${username} left`);
      io.emit("systemMessage", `🔴 ${username} left the chat`);
      delete users[socket.id];
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
