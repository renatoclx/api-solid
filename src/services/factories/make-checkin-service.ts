import { PrismaCheckInRepository } from 'src/repositories/prisma/prisma-checkin-repository';
import { PrismaGymRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import { CheckInService } from '../checkin/checkin';

export function makeCreateCheckInService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const prismaGymRepository = new PrismaGymRepository();
  const checkInService = new CheckInService(prismaCheckInRepository, prismaGymRepository);

  return checkInService;
}
