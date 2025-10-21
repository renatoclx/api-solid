import { PrismaCheckInRepository } from 'src/repositories/prisma/prisma-checkin-repository';
import { PrismaGymRepository } from 'src/repositories/prisma/prisma-gyms-repository';
import { ValidateCheckInService } from '../checkin/validate-checkin';

export function makeValidateCheckInService() {
  const prismaCheckInRepository = new PrismaCheckInRepository();
  const prismaGymRepository = new PrismaGymRepository();
  const validateCheckInService = new ValidateCheckInService(prismaCheckInRepository, prismaGymRepository);

  return validateCheckInService;
}
