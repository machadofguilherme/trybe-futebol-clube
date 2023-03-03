import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchMock from '../mocks/MatchMock';
import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  afterEach(() => sinon.restore());

  it('GET /matches - Obtém todas as partidas', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(MatchMock as unknown as MatchModel[]);

    const response = await chai.request(app).get('/matches').send();
    
    expect(response.body).to.be.deep.equal(MatchMock);
    expect(response.status).to.be.equal(200);
  });
});

describe('PATCH /matches', () => {
  afterEach(() => sinon.restore());

  it('PATCH /matches - Testando alguma coisa', async () => {
  const mock: object = { message: 'Updated scoreboard' } as object;
  sinon.stub(MatchModel, 'update').resolves();

    const response = await chai.request(app).patch('/matches').send(
      {
        homeTeamGoals: 1,
        awayTeamGoals: 2
      }
    );
  
  expect(response.body).not.be.deep.equal(mock);
  });
});
