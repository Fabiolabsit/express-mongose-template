import winston from 'winston';
import path from 'path';

// Define colors for the timestamp and log level
const timestampColor = '\x1b[38;2;0;179;189m'; // #70d9ba
const levelColor = '\x1b[38;2;112;217;186m'; // #00b3bd
const resetColor = '\x1b[0m'; // Reset color

// Define a custom format that converts the log level to uppercase and applies colors
const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `[${levelColor}${level.toUpperCase()}${resetColor}] ${timestampColor}${timestamp}${resetColor}  ${message}`;
});

// Logger configuration interface
interface LoggerConfig {
  environment: 'production' | 'development';
  logDirectory?: string;
}

// Create a logger function based on the environment
const createLogger = ({ environment, logDirectory = 'logs' }: LoggerConfig): winston.Logger => {
  const transports: winston.transport[] = [];

  if (environment === 'production') {
    transports.push(
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logDirectory, 'error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join(logDirectory, 'info.log'),
        level: 'info',
      }),
      new winston.transports.File({
        filename: path.join(logDirectory, 'warn.log'),
        level: 'warn',
      }),
      new winston.transports.File({
        filename: path.join(logDirectory, 'combined.log'),
      })
    );

    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestampColor}[${timestamp}]${resetColor} ${levelColor}[${level.toUpperCase()}]${resetColor} ${message}`;
        })
      ),
      transports,
    });
  } else {
    transports.push(new winston.transports.Console());

    return winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss' }),
        customFormat
      ),
      transports,
    });
  }
};

// Export loggers for different environments
export const productionLogger = (): winston.Logger => createLogger({ environment: 'production' });
export const developmentLogger = (): winston.Logger => createLogger({ environment: 'development' });
