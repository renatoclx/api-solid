import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';

describe('Teste de perfil E2E', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Verifica se é possível buscar infos do perfil', async () => {
    await request(app.server).post('/users').send({
      name: 'Beltrano',
      email: 'beltrano@email.com',
      password: '123456',
    });

    const authResponse = await request(app.server).post('/auth').send({
      email: 'beltrano@email.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send();
    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.profile).toEqual(
      expect.objectContaining({
        email: 'beltrano@email.com',
      }),
    );
  });
});
