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

    // Cria a academia
    const gymResponse = await request(app.server).post('/gym').set('Authorization', `Bearer ${token}`).send({
      title: 'Academia 10',
      description: 'Academia do Renato',
      latitude: -21.1861831,
      longitude: -49.5747136,
    });

    const gymId = gymResponse.body.gym.id; // Certifique-se que o controller retorna { gym }

    // Realiza o check-in
    const checkInRealized = await request(app.server)
      .post(`/gyms/${gymId}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.1861831,
        longitude: -49.5747136,
      });

    expect(checkInRealized.statusCode).toEqual(201);

    // Consulta métricas
    const response = await request(app.server).get('/checkins/metrics').set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkInsCount).toBe(1); // Verifica se há 1 check-in registrado
  });
});
