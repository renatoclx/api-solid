import type { FastifyInstance } from 'fastify';
import { register } from './controllers/register.controller';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJWT } from './middlewares/verify-jwt';

// Crio um plugin do fastify para registrar as rotas da aplicação
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/auth', authenticate);

  /* Rotas Autenticadas */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
