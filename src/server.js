import WebSocket, { WebSocketServer } from "ws";
import { log, userLog } from "./logger.js";
import { verifyClient } from "./authentification.js";

const wss = new WebSocketServer({
  port: 8080,
  verifyClient,
});

log("websocket server started");

wss.on("connection", (ws, req) => {
  const userName = req.user.name;
  userLog("connection opened", userName);

  ws.on("message", (message) => {
    userLog("new message:", userName);
    console.log(message.toString());
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    });
  });

  ws.on("close", () => {
    userLog("connection closed", userName);
  });

  ws.on("error", (error) => {
    userLog("an error occured:", userName, true);
    console.error(error);
  });
});
