import type { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserProfileService } from 'src/services/factories/make-get-user-profile-service';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileService();
  const profile = await getUserProfile.execute({
    userId: request.user.sub,
  });

  // Editando para não vir o password na resposta
  return reply.status(200).send({
    profile: {
      ...profile,
      password_hash: undefined,
    },
  });
}
