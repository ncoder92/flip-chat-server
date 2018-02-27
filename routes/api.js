const express = require('express');
const router = express.Router();

const Room = require('../models/room');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.statusMessage = 'Yep, I\'m an API';
  res.status(209).json({ hi: 'Welcome to flipChat' });
});

router.post('/:room/update', (req, res, next) => {
  const roomId = req.params.room;
  const newMessage = req.body.message;
  Room.findOneAndUpdate({ code: roomId }, { $push: { messages: newMessage } }, { new: true })
    .then((roomFound) => {
      console.log(roomFound);
    })
    .catch(next);
});

module.exports = router;
