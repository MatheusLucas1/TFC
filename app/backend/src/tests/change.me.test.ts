import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/SequelizeTeam';
import { teams, team1 } from './mocks/Teams.mock'
// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration tests', () => {

  afterEach(sinon.restore);


  it('should return all teams', async function() {
    sinon.stub(TeamModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);

    expect(body).to.deep.equal(teams)
})

it('should return a team by id', async function() {
  sinon.stub(TeamModel, 'findOne').resolves(teams as any);

  const { status, body } = await chai.request(app).get('/teams/1');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(team1);
});
});
