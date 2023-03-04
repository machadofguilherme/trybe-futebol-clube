import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /leaderboard', () => {
  afterEach(() => sinon.restore());

  it('GET /leaderboard/home - Retorna o status correto.', async () => {
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
  });
});
