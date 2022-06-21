import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  const ip = `${req.socket.remoteAddress}:${req.socket.remotePort}`;
  log("connection opened", ip);

  ws.on("message", (message, binary) => {
    log("new message:", ip);
    console.log(message.toString());
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, binary);
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

const log = (text, ip, error = false) => {
  const date = new Date();
  const message = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}] ${ip} - ${text}`;
  error ? console.error(message) : console.log(message);
};
