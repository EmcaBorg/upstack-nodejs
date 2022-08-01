import { NextFunction, Request, Response } from 'express';
import { controller, request, response, httpGet, httpPost, requestParam } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Logger } from '../core/logger';
import { Role } from '../repositories/roles';
import { validator } from '../core/middleware';
import schema from '../core/schema';
import RolesService from '../services/roles';
import TYPES from '../core/types';

@controller('/roles')
export class RolesController {

  constructor(@inject(TYPES.RolesService) private readonly rolesService: RolesService, @inject(TYPES.Logger) private readonly logger: Logger) {}

  @httpGet('/all')
  private async list(req: Request, res: Response, next: NextFunction) {
    try{
      const roles: Role[] = await this.rolesService.getRoles();
      res.json(roles);
    } 
    catch(err) {
      next(err);
    }
  }

  @httpGet('/search/:code')
  private async search(@requestParam('code') code: string, @response() res: Response, next: NextFunction) {
    try{
      const roles: Role[] = await this.rolesService.getRolesByCode(code);
      res.json(roles);
    } 
    catch(err){
      next(err);
    }
  }

  @httpPost('/save', validator(schema.rolesPOST))
  private async create(@request() req: Request, @response() res: Response, next: NextFunction) {
    try{
      await this.rolesService.saveRole(req.body);
      res.sendStatus(201);
    } 
    catch(err) {
      next(err);
    }
  }
}