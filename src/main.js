import app from './app.js';
import mongoClient from './dbClient.js';
import logger from './common/logger.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.log('info', `Server started on port ${PORT}`);
});
