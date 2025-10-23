import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateCheckInService } from 'src/services/factories/make-checkin-service';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInSchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value <= 90);
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value <= 180);
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInSchema.parse(request.body);
  const createCheckInService = makeCreateCheckInService();

  const checkIn = await createCheckInService.execute({
    userId: request.user.sub, // id do usuário logado
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({ checkIn });
}
