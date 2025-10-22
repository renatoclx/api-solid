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

  try {
    await createCheckInService.execute({
      userId: request.user.sub, // id do usuário logado
      gymId,
      userLatitude: latitude,
      userLongitude: longitude,
    });
  } catch (error) {
    if (error.instanceof.CheckInOnSameDateError) {
      return reply.status(400).send({ message: error.message });
    }

    if (error.instanceof.MaxDistanceError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
