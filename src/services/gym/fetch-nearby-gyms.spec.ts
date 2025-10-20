import { expect, describe, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsService } from './fetch-nearby-gyms';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsService;

describe('Academias mais próximas', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsService(inMemoryGymsRepository);
  });

  it('Buscar academias mais próximas', async () => {
    await inMemoryGymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await inMemoryGymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const gyms = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
