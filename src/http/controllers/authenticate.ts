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

    await authenticateService.create({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
}
