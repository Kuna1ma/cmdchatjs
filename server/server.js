import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // allow all
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("CMDChatJS server is running ✅");
});

io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("joinChat", (username) => {
    socket.username = username;
    console.log(`${username} joined`);
    io.emit("systemMessage", `${username} joined the chat.`);
  });

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.username} disconnected`);
    io.emit("systemMessage", `${socket.username} left the chat.`);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
