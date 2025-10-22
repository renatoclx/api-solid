import type { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';

// Crio um plugin do fastify para registrar as rotas da aplicação
export async function gymRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT); // Todas as rotas vão chamar o middleware de autenticação

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);
  app.post('/gym', create);
}
