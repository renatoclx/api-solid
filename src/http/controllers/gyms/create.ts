import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateGymService } from 'src/services/factories/make-create-gym-service';
import z from 'zod';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymSchema = z.object({
    title: z.string(),
    description: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { title, description, phone, latitude, longitude } = createGymSchema.parse(request.body);

  const gymService = makeCreateGymService(); // Pega o factory
  const gym = await gymService.execute({ title, description, phone, latitude, longitude });

  return reply.status(201).send({ gym });
}
