import type { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '../../middlewares/verify-jwt';

// Crio um plugin do fastify para registrar as rotas da aplicação
export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/auth', authenticate);

  /* Rotas Autenticadas */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
