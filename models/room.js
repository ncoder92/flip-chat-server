const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  code: String,
  messages: [
    {
      handle: String,
      message: String
    }
  ],
  password: String,
  isProtected: { type: Boolean, default: false }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
