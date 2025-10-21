import { prisma } from 'src/lib/prisma';
import { Prisma } from '@prisma/client';
import type { Gym } from '@prisma/client';
import type { GymsRepository } from '../gyms-repository';

export class PrismaGymRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      where: {
        data,
      },
    });

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }

  async nearbyGyms(latitude: number, longitude: number) {
    const gyms = await prisma.$queryRaw<Gym[]>`
        SELECT * from gyms WHERE ( 6371 * acos( cos( radians(${latitude}) ) * 
        cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + 
        sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }
}
