# CMDChatJS
CMDChatJS is a simple command-line chat system built with Node.js and Socket.IO, allowing you to chat directly from your terminal with color-coded messages and real-time updates.

---

## Features
- Realtime chat using Socket.IO  
- Colorized messages with Chalk  
- System join and leave notifications  
- Easy command-line interface (CLI)  
- Saves your last connected server in `.last_server`  
- Works on Windows, macOS, Linux, and iOS (with Node)

---

## Installation

### Global installation

npm install -g cmdchatjs

Usage
Connect to the default server
cmdchat connect

Connect to a custom server
cmdchat connect https://your-server-url.com


or simply

cmdchat https://your-server-url.com

Run your own server

Clone the repository:

git clone https://github.com/Kuna1ma/cmdchatjs.git
cd cmdchatjs


Install dependencies:

npm install


Start the server:

node server/server.js


The server will run on:

http://localhost:5000

## CLI Commands
Command	Description
/exit	Leave the chat
cmdchat connect	Connect to the default server
cmdchat connect <url>	Connect to a custom server
cmdchat install	Install dependencies
cmdchat -V	Display current version
iOS or Mobile Terminal (iSH / Termux)

If cmdchat connect fails to run on mobile, you can manually connect with:

node /usr/local/lib/node_modules/cmdchatjs/client/client.js https://cmdchatjs.onrender.com

Default Public Server

A public instance is available at:

https://cmdchatjs.onrender.com


Connect using:

cmdchat connect https://cmdchatjs.onrender.com

Development Notes

If you make changes and want to publish a new version:

npm version patch
npm publish --access public


If Git shows “working directory not clean,” commit or stash your changes before running the version command.

## Author

Rex (Kuna1ma)
GitHub: https://github.com/Kuna1ma/cmdchatjs

## License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this software.

