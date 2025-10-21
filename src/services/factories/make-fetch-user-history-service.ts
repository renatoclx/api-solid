import { PrismaCheckInRepository } from 'src/repositories/prisma/prisma-checkin-repository';
import { FetchUserHistoryService } from '../checkin/fetch-user-history';

export function makeFetchNearbyGymsService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const fetchUserHistoryService = new FetchUserHistoryService(prismaCheckInRepository);

  return fetchUserHistoryService;
}
