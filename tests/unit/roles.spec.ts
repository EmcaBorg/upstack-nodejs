import 'reflect-metadata';
import 'mocha';
import { expect } from 'chai';
import container from '../../src/core/container';
import TYPES from '../../src/core/types';
import RolesService from '../../src/services/roles';

const service: RolesService = container.get<RolesService>(TYPES.RolesService);

describe('Roles test', () => {
 
  it('should return roles', async () => {
    const roles = await service.getRoles();
    expect(roles).length.greaterThan(0);
  });

  it('should return roles by code', async () => {
    const expected = { 'id': 7, 'role_code': 'hulksmash', 'role_name': ' Smasher Of Things...also scientist' };
    const code = 'hulksmash';
    const roles = await service.getRolesByCode(code);
    expect(roles).length.greaterThan(0);
    expect(roles.at(0)).to.deep.equal(expected);
  });

});