import { Container } from 'inversify';
import { Logger } from './logger';
import { Database } from './database';
import TYPES from './types';
import EmployeesService from '../services/employees';
import RolesService from '../services/roles';
import '../controllers/employees';
import '../controllers/roles';

const container = new Container();
container.bind(TYPES.Logger).to(Logger).inSingletonScope();
container.bind(TYPES.Database).to(Database).inSingletonScope();
container.bind(TYPES.EmployeesService).to(EmployeesService).inSingletonScope();
container.bind(TYPES.RolesService).to(RolesService).inSingletonScope();

export default container;