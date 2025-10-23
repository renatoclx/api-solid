import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createAndAuthenticateUser } from 'src/utils/tests/create-and-authenticate-user';

describe('Testes do controller de Academias', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it.skip('Adicionar uma nova academia e2e', async () => {
    const token = await createAndAuthenticateUser(app);

    const response = await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Nanato Gym',
      description: 'Academia do Renato',
      latitude: -21.1861831,
      longitude: -49.5747136,
    });

    expect(response.statusCode).toEqual(201);
  });
});
