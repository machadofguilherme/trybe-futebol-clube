import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';
import TeamMock from '../mocks/TeamMock';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(TeamModel, "findAll")
      .resolves({ ...TeamMock } as TeamModel[]);
  });

  after(()=>{
    (TeamModel.findAll as sinon.SinonStub).restore();
  })

  it('...', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
       
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamMock);
  });
});
