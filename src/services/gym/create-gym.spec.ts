import { expect, describe, it } from 'vitest';
import { CreateGymService } from './create-gym';
import { InMemoryGymsRepository } from 'src/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach } from 'vitest';

// Testes Unitários - Testar independente de suas dependências
// Testes Unitários não chegam a camadas externas da aplicação
let inGymRepository: InMemoryUsersRepository;
let createGymService: CreateGymService;

describe('Gym Use Case', () => {
  beforeEach(() => {
    inGymRepository = new InMemoryGymsRepository();
    createGymService = new CreateGymService(inGymRepository);
  });

  it('Criar uma academia', async () => {
    const gym = await createGymService.execute({
      title: "Nanato's Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
