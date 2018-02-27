const io = require('socket.io')();

/* GET home page. */
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.join('255699');

  socket.on('sending-message', (message) => {
    socket.to('255699', message);
  });
});

module.exports = io;
