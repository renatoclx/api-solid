import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { userRoutes } from './http/controllers/users/routes';
import { gymRoutes } from './http/controllers/gyms/routes';
import { checkInRoutes } from './http/controllers/checkins/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

// Registro de plugin de cookies
app.register(fastifyCookie);

// Registro de plugin do JWT (JSON WEB TOKEN)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET, // palavra-chave que será encriptada (no .env)
  cookie: {
    cookieName: 'refreshToken', // nome do token dentro do cookie
    signed: false, // Verifica que o token no cookie não está assinado
  },
  sign: {
    //Configuração de expiração do token
    expiresIn: '10m', //token expira a cada 10 minutos
  },
});

// Registro do plugin criado para registrar as rotas da aplicação
app.register(userRoutes);
app.register(gymRoutes);
app.register(checkInRoutes);

// 'Plugin' para tratamento de erro global (Zod)
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro de validação',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV != 'production') {
    console.error(error);
  } else {
    //TODO Aqui deveríamos fazer o log pra uma ferramenta externa
  }

  return reply.status(500).send({ message: 'Internal Server Error' });
});
