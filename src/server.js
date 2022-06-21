import WebSocket, { WebSocketServer } from "ws";
import log from "./logger.js";

const wss = new WebSocketServer({ port: 8080 });

log("websocket server started");

wss.on("connection", (ws, req) => {
  const ip = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
  log("connection opened", ip);

  ws.on("message", (message) => {
    log("new message:", ip);
    console.log(message.toString());
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    });
  });

  ws.on("close", () => {
    log("connection closed", ip);
  });

  ws.on("error", (error) => {
    log("an error occured:", ip, true);
    console.error(error);
  });
});
