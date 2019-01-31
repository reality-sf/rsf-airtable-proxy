const app = require('./app');
const { createLogger } = require('./clients/logger');

const log = createLogger('server');

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  log.info(`Service is listening on port ${PORT}`);
});
