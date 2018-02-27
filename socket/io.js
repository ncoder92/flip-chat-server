const io = require('socket.io')();

/* GET home page. */
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sending-message', (message) => {
    socket.emit('new-message', message);
  });
});

module.exports = io;
