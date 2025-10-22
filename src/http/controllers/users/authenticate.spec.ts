import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

describe('Teste E2E de Autenticação', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Teste para autenticar um usuário', async () => {
    await request(app.server).post('/users').send({
      name: 'Beltrano',
      email: 'beltrano@email.com',
      password: '123456',
    });

    const response = await request(app.server).post('/auth').send({
      email: 'beltrano@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
