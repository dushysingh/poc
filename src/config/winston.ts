/**
 * Created by: Dushyant Sengar
 * Date: 24-aug-2020
 * Purpose: Activity Loggs
*/
import appRoot from 'app-root-path';
import winston from 'winston';

// define the custom settings for each transport (file, console)
let options = {
  file: {
    level: 'error',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
let logger = winston.createLogger({
  transports: [
    //new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write: (message, encoding) => {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     logger.info(message);
//   }
// };

export = logger;