const mongoose = require('mongoose');
const Room = require('../models/room');

mongoose.connect(`mongodb://localhost/flip-chat-rooms`);

const room = [
  {
    code: 255699
  }];

Room.create(room)
  .then(rooms => console.log(rooms))
  .catch(err => console.log(err));
