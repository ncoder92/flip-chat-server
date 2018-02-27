const io = require('socket.io')();

/* GET home page. */
io.on('connection', (socket) => {
  console.log('A user connected');
  const defaultRoom = '255699';
  socket.join(defaultRoom);

  socket.on('sending-message', (message) => {
    io.to(defaultRoom).emit('new-message', message);
  });
});

module.exports = io;
