import { Application } from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Logger } from './logger';
import { responseInterceptor, errorInterceptor } from './middleware';
import container from './container';
import TYPES from './types';
import cors from 'cors';
import * as bodyParser from 'body-parser';

const logger: Logger = container.get<Logger>(TYPES.Logger);

const server: Application = new InversifyExpressServer(container)
  .setConfig(app => {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(logger.middleware);
    app.use(cors());
    app.use(responseInterceptor);
    app.enable('trust proxy');
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
  })
  .setErrorConfig(app => app.use(errorInterceptor))
  .build();

export default server;

