import 'mocha';
import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

use(chaiHttp);

describe('Employees API Request', () => {
  it('get employees should return 200', () => {
    return request(app).get('/employees/all')
      .then(res => {
        expect(res.status).to.eql(200);
      });
  });
  it('search employees by name should return 200', () => {
    const name = 'Bruce Banner';
    return request(app).get('/employees/search/' + name)
      .then(res => {
        expect(res.status).to.eql(200);
      });
  });
});