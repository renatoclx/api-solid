import { PrismaGymRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import { CreateGymService } from '../gym/create-gym';

export function makeCreateGymService() {
  const prismaGymRepository = new PrismaGymRepository();
  const createGymService = new CreateGymService(prismaGymRepository);

  return createGymService;
}
