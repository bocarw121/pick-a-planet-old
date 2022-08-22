const winston = require('winston');
const morgan = require('morgan');

const logger = winston.createLogger({
  exitOnError: false,
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

//using the logger and its configured transports, to save the logs created by Morgan

const myStream = {
  write: (text) => {
    logger.info(text);
  },
};

const loggers = morgan('combined', { stream: myStream });

module.exports = {
  loggers,
};
