const io = require('socket.io')();

/* GET home page. */
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sending-message', (message) => {
    console.log(message);
  });
});

module.exports = io;
