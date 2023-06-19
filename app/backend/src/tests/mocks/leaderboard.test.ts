import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../../app';
import * as jwt from 'jsonwebtoken';
// import Example from '../database/models/ExampleModel';
import SequelizeUser from '../../database/models/UsersModel';
import jwtAuth from '../../auth/jwtAuth';
// import { Response } from 'superagent';

const { expect } = chai;

chai.use(chaiHttp);



describe('Leaderboard Test', function() {

  describe("Casos válidos e inválidos", () => {
    it('get home', async function() {
      const { status, body } = await chai.request(app)
      .get('/leaderboard/home')
      .send();
  
      expect(status).to.equal(200);
    });

  })
  afterEach(sinon.restore);
});