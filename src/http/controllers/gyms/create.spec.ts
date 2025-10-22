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

  it('Buscar academias próximas', async () => {
    const token = await createAndAuthenticateUser(app);
    await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia 01',
      description: 'Academia do Renato',
      latitude: -21.1877018,
      longitude: -49.5763831,
    });

    await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia 02',
      description: 'Academia do Renato',
      latitude: -21.1877018,
      longitude: -49.5763831,
    });

    await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia 03',
      description: 'Academia do Renato',
      latitude: -20.9206728,
      longitude: -49.4493948,
    });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -21.1877018,
        longitude: -49.5763831,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toEqual(expect.arrayContaining([expect.objectContaining({ title: 'Academia 02' })]));
  });
});
