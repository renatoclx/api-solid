import { PrismaGymRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import { FetchNearbyGymsService } from '../gym/fetch-nearby-gyms';

export function makeFetchNearbyGymsService() {
  const prismaGymRepository = new PrismaGymRepository();
  const fetchNearbyGymsService = new FetchNearbyGymsService(prismaGymRepository);

  return fetchNearbyGymsService;
}
