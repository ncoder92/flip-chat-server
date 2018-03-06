const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Room = require('../models/room');

const bcryptSalt = 10;

/* GET home page. */
router.get('/', (req, res, next) => {
  res.statusMessage = "Yep, I'm an API";
  res.status(209).json({ hi: 'Welcome to flipChat' });
});

router.get('/all-rooms', (req, res, next) => {
  Room.find({}).select('code isProtected -_id').then(result => res.json(result));
});

router.post('/new', (req, res, next) => {
  const newRoom = new Room({
    code: req.body.room,
    messages: []
  });

  if (req.body.password) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
    newRoom.password = hashPass;
    newRoom.isProtected = true;
  }
  newRoom.save().then(room => res.json(room));
});

router.post('/:room/update', (req, res, next) => {
  const roomId = req.params.room;
  const newMessage = req.body.message;
  Room.findOneAndUpdate(
    { code: roomId },
    { $push: { messages: newMessage } },
    { new: true }
  )
    .then(room => {
      res.status(200).json(room);
    })
    .catch(next);
});

router.post('/auth-room', (req, res, next) => {
  const roomId = req.body.room;
  const password = req.body.password;

  Room.findOne({ code: roomId })
    .then((foundRoom) => {
      if (bcrypt.compareSync(password, foundRoom.password)) {
        return res.json({ authorized: true });
      } else {
        return res.json({ authorized: false });
      }
    })
    .catch(next);
});

router.post('/:room', (req, res, next) => {
  const roomId = req.params.room;
  Room.findOne({ code: roomId })
    .then(room => res.json(room))
    .catch(next);
});

module.exports = router;
