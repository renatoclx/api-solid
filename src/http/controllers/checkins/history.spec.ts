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

  it('Verificar os históricos do checkIn', async () => {
    const token = await createAndAuthenticateUser(app);

    // Cria a academia
    const gymResponse = await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia 10',
      description: 'Academia do Renato',
      latitude: -21.1861831,
      longitude: -49.5747136,
    });

    const gymId = gymResponse.body.gym.id; // Certifique-se que o controller retorna { gym }

    // Realiza o primeiro check-in
    const checkInOne = await request(app.server)
      .post(`/gyms/${gymId}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.1861831,
        longitude: -49.5747136,
      });

    expect(checkInOne.statusCode).toEqual(201);

    // Busca histórico de check-ins
    const checkInTwo = await request(app.server)
      .get('/checkins/history')
      .set('Authorization', `Bearer ${token}`)
      .query({
        // usa query em GET
        latitude: -21.1861831,
        longitude: -49.5747136,
      });

    expect(checkInTwo.statusCode).toEqual(200);
    expect(checkInTwo.body.checkIns).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          gym_id: gymId,
        }),
      ]),
    );
  });
});
