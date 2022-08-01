import 'reflect-metadata';
import config from './config';
import server from './core/server';
import container from './core/container';
import TYPES from './core/types';
import { Logger } from './core/logger';

const logger: Logger = container.get<Logger>(TYPES.Logger);

const app = server.listen(config.port, () => logger.instance.info(`Listen on http://localhost:${config.port}/`));

export default app;