require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// => Require routes
const index = require('./routes/index');
const api = require('./routes/api');

const app = express();

// => Initialize Database
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// => Middlewares
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL]
  })
);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// => Initialize Routes
app.use('/', index);
app.use('/api', api);

// -- 404 and error handler

app.use((req, res, next) => {
  res.status(404).json({ error: 'not-found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ error: 'unexpected error' });
  }
});

module.exports = app;
