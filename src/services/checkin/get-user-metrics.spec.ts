import { expect, describe, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository';
import { GetUserMetricsService } from '../checkin/get-user-metrics';

let inMemoryCheckInRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsService;

describe('Histórico de um Usuário', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsService(inMemoryCheckInRepository);
  });

  it('Contar checkins de usuário', async () => {
    await inMemoryCheckInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await inMemoryCheckInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    });

    const checkInCount = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInCount).toEqual(2);
  });
});
