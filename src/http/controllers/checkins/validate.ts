import type { FastifyReply, FastifyRequest } from 'fastify';
import { makeValidateCheckInService } from 'src/services/factories/make-validate-checkin-service';
import z from 'zod';

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateParamsSchema = z.object({
    checkInId: z.string(),
  });

  const { checkInId } = validateParamsSchema.parse(request.params);
  const validateCheckInService = makeValidateCheckInService();

  try {
    await validateCheckInService.execute({ checkInId });

    return reply.statusCode(204).send();
  } catch (error) {
    if (error.instanceof.ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }

    if (error.instanceof.CheckInValidateHourError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
