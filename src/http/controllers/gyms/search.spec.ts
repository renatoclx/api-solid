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

  it.skip('Pesquisar academia pelo nome e2e', async () => {
    const token = await createAndAuthenticateUser(app);
    await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Renato Gym',
      description: 'Academia do Renato',
      latitude: -21.1877018,
      longitude: -49.5763831,
    });

    await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Neida Gym',
      description: 'Academia do Renato',
      latitude: -21.1877018,
      longitude: -49.5763831,
    });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'Renato' })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Renato Gym',
      }),
    ]);
  });
});
