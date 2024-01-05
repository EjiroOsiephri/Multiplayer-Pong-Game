let playerReadyCount = 0;

//The concept of room is just like in free fire where
//we have to wait for the players to complete
//50 befoe we can go into BR mode, in this game
//we are creating a room so that when 2 players join they join thesame room
//The next two will join the next room and so on.
// We are using the logic playerReadyCount / 2,because we can't increment . the first playerReadyCount will be zero
// 0/2 is 0 that means room 0 , the next player will have a player ready count of 1 but when we
// Math.floor(1/2) we get 0 , so the first 2 will join room 0 and the next two will join room 1 and so on

function listen(io) {
  const pongNameSpace = io.of("/pong");

  let room;

  pongNameSpace.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    room = "room" + Math.floor(playerReadyCount / 2);

    socket.join(room);

    socket.on("ready", () => {
      console.log("Player ready", socket.id, room);
      playerReadyCount++;

      if (playerReadyCount % 2 === 0) {
        pongNameSpace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(
        `Socket with id ${socket.id} disconnects cause of this: ${reason} `
      );
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
