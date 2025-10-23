import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserMetricsService } from 'src/services/factories/make-get-metrics-service';

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const userMetricsService = makeGetUserMetricsService();
  const checkInsCount = await userMetricsService.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send(checkInsCount);
}
