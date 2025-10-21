import fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';

export const app = fastify();

// Registro de plugin do JWT (JSON WEB TOKEN)
app.register(fastifyJwt, {
  secret: env.JWT_SECRET, // palavra-chave que será encriptada (no .env)
});

// Registro do plugin criado para registrar as rotas da aplicação
app.register(appRoutes);

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
