import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNearbyGymsService } from 'src/services/factories/make-fetch-nearby-gyms-service';
import z from 'zod';

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbySchema = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value <= 90);
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value <= 180);
    }),
  });

  const { latitude, longitude } = nearbySchema.parse(request.query);
  const nearbyGymsService = makeFetchNearbyGymsService();

  const gyms = await nearbyGymsService.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({
    gyms,
  });
}
