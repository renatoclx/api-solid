import { PrismaCheckInRepository } from 'src/repositories/prisma/prisma-checkin-repository';
import { GetUserMetricsService } from '../checkin/get-user-metrics';

export function makeGetUserMetricsService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const getUserMetricsService = new GetUserMetricsService(prismaCheckInRepository);

  return getUserMetricsService;
}
