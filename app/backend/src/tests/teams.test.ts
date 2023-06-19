import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import Example from '../database/models/ExampleModel';
import SequelizeUser from '../../src/database/models/UsersModel';
import jwtAuth from '../auth/jwtAuth';
// import { Response } from 'superagent';

const { expect } = chai;

chai.use(chaiHttp);



describe('Team Test', function() {

  describe("Casos válidos e inválidos", () => {
    it('getAll', async function() {
      const { status, body } = await chai.request(app)
      .get('/teams')
      .send();
  
      expect(status).to.equal(200);
    });

    it('getById', async function() {
      const { status, body } = await chai.request(app)
      .get('/teams/1')
      .send();
  
      expect(status).to.equal(200);
    });

    it('getById', async function() {
      const { status, body } = await chai.request(app)
      .get('/teams/1156651')
      .send();
  
      expect(status).to.equal(200);
    });
  })

  // describe("Casos válidos e inválidos \'/role\'", () => {
  //   it('sucesso!', async function() {
  //     sinon.stub(jwtAuth, 'verifyToken').returns({ id: 1, role: 'admin', email: '', userName: '' });
  //     const { status, body } = await chai.request(app)
  //     .get('/login/role')
  //     .set('authorization', 'some_value')
  //     .send();
  
  //     expect(body).to.be.deep.equal({ role: 'admin' });
  //     expect(status).to.equal(200);
  //   });

  //   it('incorreto 1', async function() {
  //     const { status, body } = await chai.request(app)
  //     .get('/login/role')
  //     .send();
  
  //     expect(status).to.equal(401);
  //   });

  //   it('incorreto 2', async function() {
  //     const { status, body } = await chai.request(app)
  //     .get('/login/role')
  //     .set('authorization', 'some_value')
  //     .send();
  
  //     expect(status).to.equal(401);
  //   });
  // })
  afterEach(sinon.restore);
});
