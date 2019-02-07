const jsonwebtoken = require('jsonwebtoken');
const { createLogger } = require('../clients/logger');

const log = createLogger('auth');

const authenticate = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: `In order to make a ${req.method} to ${req.path}, you must provide an authorization header`});
  }
  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SIGNING_KEY);
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      return res.status(403).json({ message: err.message });
    }
    log.info(`Recieved unknown error when authorizing token: ${err.message}. Stack: ${err.stack}`);
    res.status(500).end();
  }
};

module.exports.authenticate = authenticate;
