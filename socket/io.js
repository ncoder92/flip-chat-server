const io = require('socket.io')();

/* GET home page. */
io.on('connection', (socket) => {
  console.log('a user connected');
});

module.exports = io;
