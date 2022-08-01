import { injectable } from 'inversify';
import { inject } from 'inversify';
import { Connection, createConnection, ObjectType } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Logger } from './logger';
import TYPES from './types';
import config from '../config';
import { Employee } from '../repositories/employees';
import { Role } from '../repositories/roles';

@injectable()
export class Database {
  private static connection: Connection;

  public constructor(@inject(TYPES.Logger) private readonly logger: Logger) {}

  public async getConnection(): Promise<Connection> {
    try {
      if (Database.connection instanceof Connection) {
        return Database.connection;
      }
      Database.connection = await createConnection({
        type: 'postgres',
        host: config.host,
        port: 5432,
        username: config.username,
        password: config.password,
        database: config.database,
        entities: [Role, Employee],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
        logging: config.env === 'dev',
      });
      this.logger.instance.info('Connection established');
      return Database.connection;
    } catch (e) {
      this.logger.instance.error(e.message);
      this.logger.instance.error('Cannot establish database connection');
      process.exit(1);
    }
  }

  public async getRepository<T>(repository: ObjectType<T>): Promise<T> {
    const connection: Connection = await this.getConnection();
    return connection.getCustomRepository<T>(repository);
  }
}