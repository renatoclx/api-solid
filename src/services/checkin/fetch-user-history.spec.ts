import { expect, describe, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository';
import { FetchUserHistoryService } from './fetch-user-history';

let inMemoryCheckInRepository: InMemoryCheckInsRepository;
let sut: FetchUserHistoryService;

describe('Histórico de um Usuário', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserHistoryService(inMemoryCheckInRepository);
  });

  it('Buscar histórico de um usuário', async () => {
    await inMemoryCheckInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-01',
    });

    await inMemoryCheckInRepository.create({
      user_id: 'user-01',
      gym_id: 'gym-02',
    });

    const checkIns = await sut.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
  });

  it('Paginar histórico de um usuário', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryCheckInRepository.create({
        user_id: `user-01`,
        gym_id: `gym-${i}`,
      });
    }

    const checkIns = await sut.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-20' }),
      expect.objectContaining({ gym_id: 'gym-21' }),
    ]);
  });
});
