import 'reflect-metadata';
import 'mocha';
import { expect } from 'chai';
import container from '../../src/core/container';
import TYPES from '../../src/core/types';
import EmployeesService from '../../src/services/employees';

const service: EmployeesService = container.get<EmployeesService>(TYPES.EmployeesService);

describe('Employees test', () => {
 
  it('should return employees', async () => {
    const employees = await service.getEmployees();
    expect(employees).length.greaterThan(0);
  });

  it('should return employees by name', async () => {
    const name = 'Bruce Banner';
    const employees = await service.searchEmployeesByName(name);
    expect(employees).length.greaterThan(0);
  });

});