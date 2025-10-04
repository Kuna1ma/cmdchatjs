#!/usr/bin/env node
import { execSync } from "child_process";
import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program
  .name("cmdchat")
  .description("CMDChatJS — CLI chat using Node.js & Socket.IO")
  .version("1.0.5");

// 🧱 Install dependencies
program
  .command("install")
  .description("Install dependencies")
  .action(() => {
    console.log("Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });
  });

// 🟢 Connect command with optional URL
program
  .command("connect [serverUrl]")
  .description("Connect to chat (default: https://cmdchatjs.onrender.com)")
  .action((serverUrl) => {
    const url = serverUrl || "https://cmdchatjs.onrender.com";
    fs.writeFileSync(".last_server", url);

    // ✅ Use absolute path to your package's client.js
    const clientPath = path.join(__dirname, "client", "client.js");
    console.log(`Connecting to chat server: ${url}`);
    execSync(`node "${clientPath}" ${url}`, { stdio: "inherit" });
  });

// 🩵 Shorthand for quick connect
program
  .argument("[serverUrl]", "Quick connect without 'connect' command")
  .action((serverUrl) => {
    if (!serverUrl) {
      console.log("Usage: cmdchat connect [serverUrl]");
      return;
    }

    const url = serverUrl || "https://cmdchatjs.onrender.com";
    fs.writeFileSync(".last_server", url);

    const clientPath = path.join(__dirname, "client", "client.js");
    console.log(`Connecting to chat server: ${url}`);
    execSync(`node "${clientPath}" ${url}`, { stdio: "inherit" });
  });

program.parse(process.argv);
