import type { FastifyInstance } from 'fastify';
import { verifyJWT } from '../../middlewares/verify-jwt';
import { create } from './create';
import { validate } from './validate';
import { history } from './history';
import { metrics } from './metrics';

// Crio um plugin do fastify para registrar as rotas da aplicação
export async function checkInRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT); // Todas as rotas vão chamar o middleware de autenticação

  app.get('/checkins/history', history);
  app.get('/checkins/metrics', metrics);

  app.post('/gyms/:gymId/checkins', create);
  app.patch('/checkins/:checkInId/validate', validate);
}
