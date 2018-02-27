const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  code: String,
  messages: [
    {
      handler: String,
      message: String
    }
  ]
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
