import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import {
  matches,
  matchesFinished,
  matchesInProgress,
  mockResponse,
  mockResultUpdate,
} from '../mocks/MatchMock';

import MatchModel from '../database/models/MatchModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /matches', () => {
  afterEach(() => sinon.restore());

  it('GET /matches - Obtém todas as partidas', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as unknown as MatchModel[]);

    const response = await chai.request(app).get('/matches');
    
    expect(response.body).to.be.deep.equal(matches);
    expect(response.status).to.be.equal(200);
  });

  it('GET /matches?inProgress=true - Retorna partidas em andamento.', async () => {  
    sinon.stub(MatchModel, 'findAll').resolves(matchesInProgress);

    const response = await chai.request(app).get('/matches?inProgress=true');
  
    expect(response.body).to.be.deep.equal(matchesInProgress);
    expect(response.status).to.be.equal(200);  
  });

  it('GET /matches?inProgress=false - Retorna partidas em andamento.', async () => {  
    sinon.stub(MatchModel, 'findAll').resolves(matchesFinished);

    const response = await chai.request(app).get('/matches?inProgress=false');
  
    expect(response.body).to.be.deep.equal(matchesFinished);
    expect(response.status).to.be.equal(200);  
  });
});

describe('PATCH /matches', () => {
  afterEach(() => sinon.restore());

  it('PATCH /matches - Nenhum resultado é obtido.', async () => {
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

  it('PATCH /matches/:id - Token não encontrado.', async () => {
    sinon.stub(MatchModel, 'update').resolves([1]);

    const response = await chai
      .request(app).patch('/matches/45').send(mockResultUpdate);

    expect(response.body).to.be.deep.equal(mockResponse);
  });

  it('PATCH /matches/:id/finish - Algum teste.', async () => {
    const a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const b = 'eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjc3ODk1MjE0LCJleHAiOjE2Nzc4OTYxMTR9';
    const c = 'V0xZs8TAwQ9qNvBZJjUg3mk202P4d8Ec_reUslPvqA4';

    const token = `${a}.${b}.${c}`;

    const response = await chai
      .request(app).patch('/matches/45/finish')
      .set({ "Authorization": `Bearer ${token}` });
    
    expect(response.status).to.be.equal(401);
  });

  it('POST /matches - Algum teste.', async () => {
    const a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const b = 'eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjc3ODk1MjE0LCJleHAiOjE2Nzc4OTYxMTR9';
    const c = 'V0xZs8TAwQ9qNvBZJjUg3mk202P4d8Ec_reUslPvqA4';

    const token = `${a}.${b}.${c}`;

    const response = await chai
      .request(app).post('/matches')
      .set({ "Authorization": `Bearer ${token}` });
    
    expect(response.status).to.be.equal(401);
  });

  it('PATCH /matches/:id - Algum teste.', async () => {
    const a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const b = 'eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjc3ODk1MjE0LCJleHAiOjE2Nzc4OTYxMTR9';
    const c = 'V0xZs8TAwQ9qNvBZJjUg3mk202P4d8Ec_reUslPvqA4';

    const token = `${a}.${b}.${c}`;

    const response = await chai
      .request(app).post('/matches/:id')
      .set({ "Authorization": `Bearer ${token}` });
    
    expect(response.status).to.be.equal(404);
  });
});