/**
 * Handle possible exceptions coming from Express controllers.
 *
 * @param {Winston} log   A winston logger.
 */
const handleErrors = (log) => (handler) => async (e, ctx) => {
  try {
    await handler(e, ctx);
  } catch (err) {
    if (err.isBoom) {
      return ctx.succeed({
        statusCode: err.output.statusCode,
        body: JSON.stringify({ message: err.output }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    log.error(`Received error in ${req.method} to ${req.path}. Message: ${err.message}, stack: ${err.stack}`);
    return res.status(500).end();
  }
};

module.exports = handleErrors;
