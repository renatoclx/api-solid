import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeSearchGymsService } from 'src/services/factories/make-search-gyms-service';
import z from 'zod';

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymSchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1).optional(), // Coerce converte a informação para number
  });

  const { q, page } = searchGymSchema.parse(request.query);
  const searchGymService = makeSearchGymsService();

  const gyms = await searchGymService.execute({
    query: q,
    page,
  });

  return reply.status(200).send({
    gyms,
  });
}
