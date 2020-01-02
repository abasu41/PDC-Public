//@@@PDC-1215 use winston logger
import winston from 'winston';

var logLevel = 'info';
if (typeof process.env.GRAPHQL_LOG_LEVEL != "undefined") {
	logLevel = process.env.GRAPHQL_LOG_LEVEL;
}

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.json(),
  defaultMeta: { service: 'GraphQL' },
  transports: [
	//new winston.transports.Console({format: winston.format.simple()}),
    new winston.transports.File({ filename: 'logs/pdc-graphql-error.log', level: 'error', maxsize: 1000000, maxFiles: 10 }),
    new winston.transports.File({ filename: 'logs/pdc-graphql-combined.log', maxsize: 5000000, maxFiles: 10 })
  ]
});
 
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
/*if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}*/

export {logger} ;