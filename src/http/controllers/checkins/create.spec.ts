import request from 'supertest';
import { app } from 'src/app';
import { afterAll, beforeAll, describe, it, expect } from 'vitest';
import { createAndAuthenticateUser } from 'src/utils/tests/create-and-authenticate-user';

describe('Teste de criação de CheckIns', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Realizar um CheckIn', async () => {
    const token = await createAndAuthenticateUser(app);

    const gymResponse = await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia 10',
      description: 'Academia do Renato',
      latitude: -21.1861831,
      longitude: -49.5747136,
    });

    const gymId = gymResponse.body.gym.id;

    const response = await request(app.server)
      .post(`/gyms/${gymId}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.1861831,
        longitude: -49.5747136,
      });

    expect(response.statusCode).toEqual(201);
  });
});
