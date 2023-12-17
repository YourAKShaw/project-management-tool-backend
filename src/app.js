import 'dotenv/config';
// eslint-disable-next-line object-curly-spacing
import express, { json, urlencoded } from 'express';
import createError from 'http-errors';
import userRoutes from './routes/userRoutes.js';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(json());

// eslint-disable-next-line object-curly-spacing
app.use(urlencoded({ extended: true }));
app.use('/api', userRoutes);

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

export default app;
