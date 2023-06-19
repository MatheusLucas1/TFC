import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import * as jwt from 'jsonwebtoken';
import SequelizeUser from '../database/models/UsersModel';
import jwtAuth from '../auth/jwtAuth';

const { expect } = chai;

chai.use(chaiHttp);



describe('Match Test', function() {

  describe("Casos válidos e inválidos", () => {
    it('getAll', async function() {
      const { status, body } = await chai.request(app)
      .get('/matches')
      .send();
  
      expect(status).to.equal(200);
    });

    it('getAll inProgress', async function() {
      const { status, body } = await chai.request(app)
      .get('/matches?inProgress=true')
      .send();
  
      expect(status).to.equal(200);
    });

    it('getAll finished', async function() {
      const { status, body } = await chai.request(app)
      .get('/matches?inProgress=false')
      .send();
  
      expect(status).to.equal(200);
    });

    it('create', async function() {
      const userLogin: jwt.JwtPayload = { id: 1, role: 'admin', email: '', userName: '' };
      sinon.stub(jwt, 'verify').callsFake((_user) => { return userLogin;});
      const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'some_value')
      .send({
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 2,
      });
  
      expect(status).to.equal(201);
    });

    it('create inválido', async function() {
      // sinon.stub(jwtAuth, 'verifyToken').resolves({ id: 1, role: 'admin', email: '', userName: '' });
      const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'some_value')
      .send({
        homeTeamId: 1,
        awayTeamId: 2,
        homeTeamGoals: 1,
        awayTeamGoals: 2,
      });
  
      expect(status).to.equal(401);
    });

    it('finish match', async function() {
      const userLogin: jwt.JwtPayload = { id: 1, role: 'admin', email: '', userName: '' };
      sinon.stub(jwt, 'verify').callsFake((_user) => { return userLogin;});
      const { status, body } = await chai.request(app)
      .patch('/matches/1/finish')
      .set('authorization', 'some_value')
      .send();
  
      expect(status).to.equal(200);
    });

    it('finish match 2', async function() {
      const userLogin: jwt.JwtPayload = { id: 1, role: 'admin', email: '', userName: '' };
      sinon.stub(jwt, 'verify').callsFake((_user) => { return userLogin;});
      const { status, body } = await chai.request(app)
      .patch('/matches/1222333/finish')
      .set('authorization', 'some_value')
      .send();
  
      expect(status).to.equal(200);
    });

    it('update match', async function() {
      const userLogin: jwt.JwtPayload = { id: 1, role: 'admin', email: '', userName: '' };
      sinon.stub(jwt, 'verify').callsFake((_user) => { return userLogin;});
      const { status, body } = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'some_value')
      .send({
        homeTeamGoals: 1,
        awayTeamGoals: 2,
      });
  
      expect(status).to.equal(200);
    });

  })

  afterEach(sinon.restore);
});