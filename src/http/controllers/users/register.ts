import type { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { UserAlreadyExistsError } from 'src/services/register/errors/user-already-exists';
import { makeRegisterService } from 'src/services/factories/make-register-service';

// Função que vai registrar um usuário no Banco de dados
export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Schema de validação com zod, para tratar campos recebidos
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  // Faz o parse da requisição para verificar os campos
  const { name, email, password } = createUserSchema.parse(request.body);

  try {
    // Instancio o serviço e passa o repositório como parâmetro
    // Chamada do serviço via Factory Pattern
    const registerService = makeRegisterService();

    // Chama o serviço registerService para realizar o registro, passando
    // por parâmetro o objeto parseado
    await registerService.execute({ name, email, password });
  } catch (error) {
    // Como o error é tratado com throws no service, ele é uma instância de UserAlreadyExists
    // Verificamos por convenção se o error é uma instância de fato com instanceof
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
