#!/usr/bin/env node
import { execSync } from "child_process";
import { Command } from "commander";
import fs from "fs";

const program = new Command();

program
  .name("cmdchat")
  .description("CMDChatJS — CLI chat using Node.js & Socket.IO")
  .version("1.0.0");

program
  .command("install")
  .description("Install dependencies")
  .action(() => {
    console.log("Installing dependencies...");
    execSync("npm install", { stdio: "inherit" });
  });

program
  .command("connect")
  .description("Connect to chat")
  .option("--server <url>", "Specify server URL (default: localhost:5000)")
  .action((options) => {
    const serverUrl = options.server || "http://localhost:5000";
    fs.writeFileSync(".last_server", serverUrl);
    console.log(`Connecting to chat server: ${serverUrl}`);
    execSync(`node client/client.js ${serverUrl}`, { stdio: "inherit" });
  });

program.parse(process.argv);
