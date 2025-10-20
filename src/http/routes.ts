import type { FastifyInstance } from 'fastify';
import { register } from './controllers/register.controller';
import { authenticate } from './controllers/authenticate';

// Crio um plugin do fastify para registrar as rotas da aplicação
export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/auth', authenticate);
}
