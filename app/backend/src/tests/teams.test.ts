import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import TeamMock from '../mocks/TeamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  afterEach(() => sinon.restore());

  it('GET /teams - Obtém todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(TeamMock as unknown as TeamModel[]);

    const response = await chai.request(app).get('/teams').send();
    
    expect(response.body).to.be.deep.equal(TeamMock);
    expect(response.status).to.be.equal(200);
  });

  // it('GET /teams/:id - Obtém um time', async () => {
  //   sinon.stub(TeamModel, 'findAll').resolves(TeamMock as unknown as TeamModel[]);

  //   const response = await chai.request(app).get('/teams').send();
    
  //   expect(response.body).to.be.deep.equal(TeamMock);
  //   expect(response.status).to.be.equal(200);
  // });
});
