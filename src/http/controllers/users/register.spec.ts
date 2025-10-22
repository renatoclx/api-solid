import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

describe('Teste de Registro E2E', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Verifica se é possível cadastrar um usuário', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Beltrano',
      email: 'beltrano@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(201);
  });
});
