import { injectable, inject } from 'inversify';
import { Database } from '../core/database';
import { RolePayload } from '../core/models';
import { Role, RolesRepository } from '../repositories/roles';
import TYPES from '../core/types';

@injectable()
export default class {

  constructor(@inject(TYPES.Database) private readonly database: Database) {}
  
  public async getRoles(): Promise<Role[]> {
    const repository: RolesRepository = await this.database.getRepository(RolesRepository);
    const roles: Role[] = await repository.find({order: {id: 'ASC'}});
    return roles;
  }

  public async getRolesByCode(code: string): Promise<Role[]> {
    const repository: RolesRepository = await this.database.getRepository(RolesRepository);
    const roles: Role[] = await repository.createQueryBuilder('roles')
      .where('LOWER(role_code) LIKE :code', { code: `%${ code.toLowerCase() }%` })
      .getMany();
    return roles;
  }

  public async saveRole(payload: RolePayload): Promise<void>{
    const repository: RolesRepository = await this.database.getRepository(RolesRepository);
    const role: Role = new Role();
    role.role_code = payload.roleCode;
    role.role_name = payload.roleName;
    await repository.save(role);
  }
}