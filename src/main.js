const app = require('./app');
const logger = require('./common/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.log('info', `Server started on port ${PORT}`);
});
