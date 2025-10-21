import { expect, describe, it, vi } from 'vitest';
import { beforeEach, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from 'src/repositories/in-memory/in-memory-checkins-repository';
import { ValidateCheckInService } from './validate-checkin';
import { ResourceNotFoundError } from '../profile/errors/resource-not-found';

let inMemoryCheckInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe('Validação de CheckIns', () => {
  beforeEach(async () => {
    inMemoryCheckInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(inMemoryCheckInRepository);

    // Criando um mock de data através do vitest
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Após o teste, volto a utilizar datas "normais"
    vi.useRealTimers();
  });

  it('Validar um checkIn', async () => {
    const checkIn = await inMemoryCheckInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user_01',
    });

    await sut.execute({
      checkInId: checkIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(inMemoryCheckInRepository.items[0]?.validated_at).toEqual(expect.any(Date));
  });

  it('Não validar checkIn que não existe', async () => {
    await expect(
      sut.execute({
        checkInId: 'bla',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('Após 20min, não é possível validar checkIn', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

    const checkIn = await inMemoryCheckInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user_01',
    });

    vi.advanceTimersByTime(1000 * 60 * 21);

    await expect(
      sut.execute({
        checkInId: checkIn.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
