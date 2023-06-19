import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';
import { app } from '../app';
import Team from '../database/models/TeamsModel';
import { teams, team1 } from './mocks/Teams.mock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration tests', () => {

  afterEach(sinon.restore);


  it('should return all teams', async function() {
    sinon.stub(Team, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);

    expect(body).to.deep.equal(teams)
})

it('should return a team by id', async function() {
  sinon.stub(Team, 'findOne').resolves(teams as any);

  const { status, body } = await chai.request(app).get('/teams/1');

  expect(status).to.equal(200);
  expect(body).to.deep.equal(team1);
});
it('should return not found if the team doesn\'t exists', async function() {
  sinon.stub(Team, 'findOne').resolves(null);

  const { status, body } = await chai.request(app).get('/teams/102');

  expect(status).to.equal(404);
  expect(body.message).to.equal('Team 102 not found');
});
});