const http = require("http");
const { Server } = require("socket.io");
const sockets = require("./sockets");
const api = require("./api");

const server = http.createServer(api);

const PORT = 3000;

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000/",
    credentials: true,
  },
});

sockets.listen(io);

server.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
