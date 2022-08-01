import { injectable, inject } from 'inversify';
import { Database } from '../core/database';
import { EmployeePayload } from '../core/models';
import TYPES from '../core/types';
import { Employee, EmployeesRepository } from '../repositories/employees';
import { Role, RolesRepository } from '../repositories/roles';

@injectable()
export default class {

  constructor(@inject(TYPES.Database) private readonly database: Database) {}
  
  public async getEmployees(): Promise<Employee[]> {
    const repository: EmployeesRepository = await this.database.getRepository(EmployeesRepository);
    const employees: Employee[] = await repository.find({relations: ['role'], order: {id: 'ASC'}});
    return employees;
  }

  public async searchEmployeesByName(name: string): Promise<Employee[]> {
    const repository: EmployeesRepository = await this.database.getRepository(EmployeesRepository);
    const employees: Employee[] = await repository.createQueryBuilder('employees')
      .where('LOWER(name) LIKE :name', { name: `%${ name.toLowerCase() }%` })
      .innerJoinAndSelect('employees.role', 'roles')
      .getMany();
    return employees;
  }

  public async saveEmployee(payload: EmployeePayload): Promise<void> {
    const employeesRepository: EmployeesRepository = await this.database.getRepository(EmployeesRepository);
    const rolesRepository: RolesRepository = await this.database.getRepository(RolesRepository);
    const role: Role = await rolesRepository.findOne(payload.roleId);
    const employee: Employee = new Employee();
    employee.username = payload.username;
    employee.email = payload.email;
    employee.name = payload.name;
    employee.role = role;
    await employeesRepository.save(employee);
  }
}