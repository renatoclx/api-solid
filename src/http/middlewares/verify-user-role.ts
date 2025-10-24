import type { FastifyReply, FastifyRequest } from 'fastify';

// Middleware que verifica se a role do usuário logado
export async function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
  };
}
