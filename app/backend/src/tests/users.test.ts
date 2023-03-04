import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { invalidEmail, invalidPassword } from '../mocks/UserMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /login', () => {
  afterEach(() => sinon.restore());
  
  const invalidMessage = { "message": "Invalid email or password" };

  it('POST /login - Campo email inválido.', async () => {
    const response = await chai.request(app).post('/login').send(invalidEmail);
    
    expect(response.body).to.be.deep.equal(invalidMessage);
    expect(response.status).to.be.equal(401);
  });

  it('POST /login - Um erro ocorre ao não encontrar o usuário no banco de dados.', async () => {
    const response = await chai.request(app)
      .post('/login').send({ email: 'xablau@xablauzeiros.com', password: 'amololis' });
    expect(response.status).not.to.be.equal(200);
  });

  it('POST /login - Campo password inválido.', async () => {
    const response = await chai.request(app).post('/login').send(invalidPassword);
    
    expect(response.body).to.be.deep.equal(invalidMessage);
    expect(response.status).to.be.equal(401);
  });

  it('POST /login - Não possuí campos preenchidos.', async () => {
    const response = await chai.request(app).post('/login');

    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });

  it('POST /login - Não é possível preencher o campo email com números.', async () => {
    const response = await chai
      .request(app).post('/login').send({ email: 12345 });

    expect(response.body).to.be.deep.equal({ "message": "All fields must be filled" });
    expect(response.status).to.be.equal(400);
  });

  it('GET /login/role - Algum teste.', async () => {
    const a = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    const b = 'eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjc3ODk1MjE0LCJleHAiOjE2Nzc4OTYxMTR9';
    const c = 'V0xZs8TAwQ9qNvBZJjUg3mk202P4d8Ec_reUslPvqA4';

    const token = `${a}.${b}.${c}`;

    const response = await chai
      .request(app).get('/login/role')
      .set({ "Authorization": `Bearer ${token}` });
    
    expect(response.status).to.be.equal(401);
  });
});
