const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1234 });

wss.on("connection", function connection(ws) {
  console.log("new client");
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
