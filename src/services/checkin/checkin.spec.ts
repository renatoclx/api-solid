import { expect, describe, it, vi } from 'vitest';
import { beforeEach, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository';
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import { CheckInService } from './checkin';
import { MaxDistanceError } from './errors/max-distance';
import { CheckInOnSameDateError } from './errors/checkin-same-date';

let inMemoryCheckInRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CheckInService;

describe('Validação de CheckIns', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CheckInService(inMemoryCheckInRepository, inMemoryGymsRepository);

    inMemoryGymsRepository.create({
      id: 'gym-01',
      title: 'Academia do Nanato',
      description: 'Teste...',
      phone: '',
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    // Criando um mock de data através do vitest
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Após o teste, volto a utilizar datas "normais"
    vi.useRealTimers();
  });

  it('Habilitar um novo checkIn', async () => {
    // TDD
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // Data mockada

    const checkIn = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('Não posso fazer 02 checkIns no mesmo dia', async () => {
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(CheckInOnSameDateError);
  });

  it('Fazer 02 checkIns em dias diferentes', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // Data mockada
    await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    vi.setSystemTime(new Date(2022, 0, 23, 8, 0, 0)); // Data mockada
    const checkIn = await sut.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('Proibir o checkIn distante da academia', async () => {
    inMemoryGymsRepository.items.push({
      id: 'gym-02',
      title: 'Academia do Nanateta',
      description: 'Teste...',
      phone: '',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym-02',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
