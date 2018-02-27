const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.statusMessage = 'Yep, I\'m an API';
  res.status(209).json({ hi: 'Welcome to flipChat' });
});

module.exports = router;
