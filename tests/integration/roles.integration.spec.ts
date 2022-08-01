import 'mocha';
import { request, expect, use } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/app';

use(chaiHttp);

describe('Roles API Request', () => {
  it('get roles should return 200', () => {
    return request(app).get('/roles/all')
      .then(res => {
        expect(res.status).to.eql(200);
      });
  });
  it('get roles by code should return 200', () => {
    const code = 'hulksmash';
    return request(app).get('/roles/search/' + code)
      .then(res => {
        expect(res.status).to.eql(200);
      });
  });
});