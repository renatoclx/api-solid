import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';
import { GetUserProfileService } from '../profile/get-user-profile';

export function makeGetUserProfileService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const getUserProfileService = new GetUserProfileService(prismaUsersRepository);

  return getUserProfileService;
}
