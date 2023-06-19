import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import jwtAuth from '../auth/jwtAuth'
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login Test', function() {

  describe("Casos válidos e inválidos", () => {
    afterEach(sinon.restore);
    it('sucesso!', async function() {
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
  
      expect(status).to.equal(200);
    });

    it('incorreto 1', async function() {
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'asecret_admin' });
  
      expect(status).to.equal(401);
    });

    it('incorreto 2', async function() {
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' });
  
      expect(status).to.equal(400);
    });

    it('incorreto 3', async function() {
      const { status, body } = await chai.request(app)
      .post('/login')
      .send({ password: 'asecret_admin' });
  
      expect(status).to.equal(400);
    });
  })

  describe("Casos válidos e inválidos \'/role\'", () => {
    it('sucesso!', async function() {
      sinon.stub(jwtAuth, 'verifyToken').returns({ id: 1, role: 'admin', email: '', userName: '' });
      const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'some_value')
      .send();
  
      expect(body).to.be.deep.equal({ role: 'admin' });
      expect(status).to.equal(200);
    });

    it('incorreto 1', async function() {
      const { status, body } = await chai.request(app)
      .get('/login/role')
      .send();
  
      expect(status).to.equal(401);
    });

    it('incorreto 2', async function() {
      const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'some_value')
      .send();
  
      expect(status).to.equal(401);
    });
  })
  afterEach(sinon.restore);
});
