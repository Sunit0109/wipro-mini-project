const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  socket.on("message", (message) => {
    const data = JSON.parse(message);

    server.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  socket.on("close", () => {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: "user-left" }));
      }
    });
  });
});

console.log("WebSocket signaling server running on ws://localhost:8080");
