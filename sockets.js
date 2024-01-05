let playerReadyCount = 0;

function listen(io) {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    socket.on("ready", () => {
      console.log("Player ready", socket.id);
      playerReadyCount++;

      if (playerReadyCount % 2 === 0) {
        io.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(
        `Socket with id ${socket.id} disconnects cause of this: ${reason} `
      );
    });
  });
}

module.exports = {
  listen,
};
