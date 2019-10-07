const log = require('../clients/logger').createLogger('handleErrors');
const _ = require('lodash');

/**
 * Handle possible exceptions coming from Express controllers.
 *
 * @param {Winston} log   A winston logger.
 */
const handleErrors = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output);
    }
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    if (err.request) {
      log.error(`Received error in ${req.method} to ${req.path}. Message: ${err.message}. Response body: ${JSON.stringify(_.get(err, 'response.data') || {}, null, 2)}`);
    } else {
      log.error(`Received unexepcted error during ${req.method} to ${req.path}. Message: ${err.message}. Stack: ${err.stack}`);
    }
    return res.status(500).end();
  }
};

module.exports = handleErrors;
