const io = require('socket.io')();

/* GET home page. */
io.on('connection', (socket) => {
  console.log('A user connected');
  let currentRoom;
  socket.on('sending-message', (message) => {
    io.to(currentRoom).emit('new-message', message);
  });

  socket.on('join-room', (room) => {
    socket.join(room);
    currentRoom = room;
  });
});

module.exports = io;
