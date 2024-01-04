const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 3000;

server.listen(PORT);

io.on("connection", (server) => {
  console.log(`Socket connected`);
});

console.log(`Server is listening on port ${PORT}`);
