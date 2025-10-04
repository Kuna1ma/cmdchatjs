// client/client.js
import { io } from "socket.io-client";
import readline from "readline";
import chalk from "chalk";
import fs from "fs";

let serverUrl = process.argv[2] || "http://localhost:5000";
try {
  if (!process.argv[2] && fs.existsSync(".last_server")) {
    serverUrl = fs.readFileSync(".last_server", "utf8").trim();
  }
} catch {}

console.log(chalk.cyanBright(`\nConnecting to server: ${serverUrl}\n`));
const socket = io(serverUrl, { transports: ["websocket"] });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colorList = ["red", "green", "blue", "cyan", "magenta", "yellow", "white"];

rl.question(
  chalk.cyan(`Pick your color (${colorList.join(", ")} or blank for random): `),
  (colorInput) => {
    let color =
      colorInput.trim().toLowerCase() ||
      colorList[Math.floor(Math.random() * colorList.length)];
    if (!colorList.includes(color)) {
      console.log(chalk.gray("Invalid color, defaulting to yellow."));
      color = "yellow";
    }
    console.log(chalk[color](`Your messages will appear in ${color}.\n`));

    rl.question(chalk.cyan("Enter your username: "), (username) => {
      socket.emit("joinChat", username);
      console.log(chalk.green("\nConnected! Type your messages below:"));
      console.log(chalk.gray("Type /exit to leave the chat.\n"));

      // 🧠 setup prompt label
      rl.setPrompt(chalk.gray("Type: "));
      rl.prompt();

      rl.on("line", (text) => {
        const trimmed = text.trim();
        if (trimmed === "/exit") {
          console.log(chalk.red("Disconnected from chat."));
          rl.close();
          process.exit(0);
        }

        if (trimmed.length > 0) {
          readline.cursorTo(process.stdout, 0);
          readline.clearLine(process.stdout, 0);
          socket.emit("chatMessage", { username, text: trimmed, color });
          console.log(chalk[color](`[You]: ${trimmed}`));
        }

        rl.prompt(); // show prompt again after message
      });

      // 📨 when someone else sends a message
      socket.on("chatMessage", (msg) => {
        if (msg.username === username) return;
        const messageColor =
          msg.color && chalk[msg.color] ? msg.color : "yellow";

        // Clear current input before showing new message
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);
        console.log(chalk[messageColor](`[${msg.username}]: ${msg.text}`));

        rl.prompt(); // refresh clean prompt
      });

      // 🟢🟠 System notifications
      socket.on("systemMessage", (text) => {
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);
        console.log(chalk.gray.italic(text));
        rl.prompt();
      });

      socket.on("connect_error", () =>
        console.log(chalk.red("❌ Failed to connect to server."))
      );
      socket.on("disconnect", () =>
        console.log(chalk.red("⚠️ Disconnected from server."))
      );
    });
  }
);
