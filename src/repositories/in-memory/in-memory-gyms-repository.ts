import type { Gym } from '@prisma/client';
import { Prisma } from '@prisma/client';
import type { GymsRepository } from '../gyms-repository';
import { randomUUID } from 'node:crypto';
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinates';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: { title: string; description: string; phone: string; latitude: number; longitude: number }) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);
    return gym;
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items.filter((item) => item.title.includes(query)).slice((page - 1) * 20, page * 20);
  }

  async nearbyGyms(latitude: number, longitude: number) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: latitude, longitude: longitude },
        { latitude: Number(item.latitude), longitude: Number(item.longitude) },
      );

      return distance < 10;
    });
  }
}
