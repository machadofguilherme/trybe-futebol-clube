import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { invalidEmail, invalidPassword, correct } from '../mocks/UserMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  afterEach(() => sinon.restore());
  const invalidMessage = { "message": "Invalid email or password" };

  it('POST /login - Campo email inválido', async () => {
    const response = await (await chai.request(app).post('/login').send(invalidEmail));
    
    expect(response.body).to.be.deep.equal(invalidMessage);
    expect(response.status).to.be.equal(401);
  });

  it('POST /login - Um erro ocorre ao não encontrar o usuário no banco de dados', async () => {
    const response = await (await chai.request(app).post('/login').send(correct));
    expect(response.status).not.to.be.equal(200);
  });

  it('POST /login - Campo password inválido', async () => {
    const response = await (await chai.request(app).post('/login').send(invalidPassword));
    
    expect(response.body).to.be.deep.equal(invalidMessage);
    expect(response.status).to.be.equal(401);
  });

  it('POST /login - Não possuí campos preenchidos', async () => {
    const response = await (await chai.request(app).post('/login').send());

    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });
});
