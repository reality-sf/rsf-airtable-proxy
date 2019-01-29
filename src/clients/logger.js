const winston = require('winston');

const prettyPrintFormat = winston.format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const createLogger = (name) => {
  return winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: name }),
      winston.format.timestamp(),
      prettyPrintFormat
    ),
    label: name,
    transports: [
      new winston.transports.Console({
        colorize: true,
        prettyPrint: true,
        timestamp: true
      })
    ]
  });
};

module.exports.createLogger = createLogger;
