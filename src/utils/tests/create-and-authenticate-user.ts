import type { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  return token;
}
