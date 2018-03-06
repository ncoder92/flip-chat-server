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

  socket.on('leave-room', (room) => {
    socket.leave(room);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

module.exports = io;
