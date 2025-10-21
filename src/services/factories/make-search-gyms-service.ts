import { PrismaGymRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import { SearchGymsService } from '../gym/search-gyms.spec';

export function makeSearchGymsService() {
  const prismaGymRepository = new PrismaGymRepository();
  const searchGymsService = new SearchGymsService(prismaGymRepository);

  return searchGymsService;
}
