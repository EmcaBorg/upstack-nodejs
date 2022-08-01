import { injectable } from 'inversify';
import { Format } from 'logform';
import morgan, { StreamOptions } from 'morgan';
import winston from 'winston';
import config from '../config';

@injectable()
export class Logger {

  constructor() {
    this._instance = winston.createLogger({
      level: this.level(),
      levels: this.levels,
      format: this.format,
      transports: this.transports,
    });
    winston.addColors(this.colors);
  }

  private _instance: winston.Logger = null;

  get instance () {
    return this._instance;
  }
  
  private levels: {[key: string]: number} = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  private colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  private stream: StreamOptions = {
    write: (message) => this.instance.http(message)
  };

  private format: Format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  );

  private transports = [
    new winston.transports.Console(),
  ];

  private level(): string {
    const env = config.env || 'development';
    return env === 'development' ? 'debug' : 'warn';
  }

  private skip() {
    const env = config.env || 'development';
    return env !== 'development';
  }

  public middleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream: this.stream, skip: this.skip }
  );
 
}


