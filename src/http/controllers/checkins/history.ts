import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchUserHistoryService } from 'src/services/factories/make-fetch-user-history-service';
import z from 'zod';

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const userHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = userHistorySchema.parse(request.query);
  const fetchUserHistoryService = makeFetchUserHistoryService();

  const checkIns = await fetchUserHistoryService.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({
    checkIns,
  });
}
