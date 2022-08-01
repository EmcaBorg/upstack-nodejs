import { NextFunction, Request, Response } from 'express';
import { controller, request, response, httpGet, httpPost, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Logger } from '../core/logger';
import TYPES from '../core/types';
import EmployeesService from '../services/employees';
import { validator } from '../core/middleware';
import schema from '../core/schema';
import { Employee } from '../repositories/employees';

@controller('/employees')
export class EmployeesController {

  constructor(@inject(TYPES.EmployeesService) private readonly employeesService: EmployeesService, @inject(TYPES.Logger) private readonly logger: Logger) {}

  @httpGet('/all')
  private async list(req: Request, res: Response, next: NextFunction) {
    try{
      const employees: Employee[] = await this.employeesService.getEmployees();
      res.json(employees);
    } 
    catch(err){
      next(err);
    }
  }

  @httpGet('/search/:name')
  private async search(@requestParam('name') name: string, @response() res: Response, next: NextFunction) {
    try {
      const employees: Employee[] = await this.employeesService.searchEmployeesByName(name);
      res.json(employees);
    }
    catch(err){
      next(err);
    }
  }

  @httpPost('/save', validator(schema.employeesPOST))
  private async create(@request() req: Request, @response() res: Response, next: NextFunction) {
    try{
      await this.employeesService.saveEmployee(req.body);
      res.sendStatus(201);
    } 
    catch(err) {
      next(err);
    }
  }
}