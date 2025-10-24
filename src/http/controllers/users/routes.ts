import type { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { refresh } from './refresh';

// Crio um plugin do fastify para registrar as rotas da aplicação
export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/auth', authenticate);

  app.patch('/token/refresh', refresh); // Chamada quando o usuário perde a autenticação

  /* Rotas Autenticadas */
  app.get('/me', { onRequest: [verifyJWT] }, profile);
}
