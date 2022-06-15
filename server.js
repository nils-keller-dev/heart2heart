// import WebSocket, { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message, { binary: false });
//       }
//     })
//   })
// })



var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});
server.listen(8080, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
  var connection = request.accept(null, request.origin);

  // This is the most important callback for us, we'll handle
  // all messages from users here.
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message
      // console.log((wsServer))
      // wsServer.clients.forEach((client) => {
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
      //   client.send(message, { binary: false });
      // }
    // })
      console.log(message);
      connection.sendUTF(message.utf8Data);
    }
  });

  connection.on('close', function(connection) {
    // close user connection
  });
});
