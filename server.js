const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const PORT = 8080;

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://127.0.0.1:5500",
    credentials: true,
  },
});

// global middlewares
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

// Your other routes or middleware can go here...

let playerReadyCount = 0;
let refereeId;

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("ready", () => {
    console.log("Player ready", socket.id);
    playerReadyCount++;

    if (playerReadyCount === 2) {
      refereeId = socket.id;
      console.log(refereeId);
      io.emit("startGame", refereeId);
    }
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
