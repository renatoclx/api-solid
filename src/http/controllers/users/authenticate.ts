import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { InvalidCredentialsError } from 'src/services/authenticate/errors/invalid-credentials';
import { makeAuthenticateService } from 'src/services/factories/make-authenticate-service';

// Nessa controller, não é criado nenhum recurso, ela é apenas utilizada afim de
// validar o usuário que está logando
export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateUserSchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    const user = await authenticateService.execute({ email, password });

    // gerando token JWT
    const token = await reply.jwtSign(
      {
        role: user.role, // Tipo de usuário (regra de acesso) registrado no token
      }, // payload
      {
        sign: {
          sub: user.id,
        },
      }, // sign
    );

    // refresh token JWT
    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      }, // payload
      {
        sign: {
          sub: user.id,
          expiresIn: '7d', // Usuário só perde o token se ficar 7 dias sem entrar no app
        },
      }, // sign
    );

    // O segundo token (refresh) será enviado através dos cookies, evitando que ele seja
    // acessado pelo front (instala o @fastify/cookie)

    // Antes de enviar o token, nós armazenamos o refreshToken nos cookies
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', // quais rotas do app terão acesso ao refreshToken
        secure: true, // Define a encriptação está sendo via HTTPs
        sameSite: true, // Acessado somente por "este site"
        httpOnly: true, // Acessado somente pelo Back-end, no contexto da requisição
      })
      .status(200)
      .send({
        token: token,
      });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
