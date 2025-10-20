import { expect, describe, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsService } from './search-gyms';

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: SearchGymsService;

describe('Buscar academias', () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsService(inMemoryGymsRepository);
  });

  it('Buscar academias pelo nome', async () => {
    await inMemoryGymsRepository.create({
      title: 'Nanato Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await inMemoryGymsRepository.create({
      title: 'Nanateta Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const gyms = await sut.execute({
      query: 'Nanateta',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Nanateta Gym' })]);
  });

  it('Paginar histórico de um usuário', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Nanateta Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const gyms = await sut.execute({
      query: 'Nanateta',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Nanateta Gym 20' }),
      expect.objectContaining({ title: 'Nanateta Gym 21' }),
    ]);
  });
});
