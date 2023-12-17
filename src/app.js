require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());

// eslint-disable-next-line object-curly-spacing
app.use(express.urlencoded({ extended: true }));

// 404 handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

module.exports = app;
