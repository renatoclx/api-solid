import { expect, describe, it } from 'vitest';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { beforeEach } from 'vitest';
import { GetUserProfileService } from './get-user-profile';
import { hash } from 'bcryptjs';
import { ResourceNotFoundError } from './errors/resource-not-found';

// Para não ter repetição de instância, cria-se variáveis globais tipadas que
// serão atribuidas antes de cada teste rodar (beforeEach())
let inMemoryUserRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe('Verificar perfil do usuário', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileService(inMemoryUserRepository);
  });

  it('Verificar usuário pelo id', async () => {
    const user = await inMemoryUserRepository.create({
      name: 'Ciclano',
      email: 'ciclano@teste.com',
      password_hash: await hash('123456', 6),
    });

    const verifyUser = await sut.execute({
      userId: user.id,
    });

    expect(verifyUser.id).toEqual(expect.any(String));
    expect(verifyUser.name).toEqual('Ciclano');
  });

  it('Validar se o id passado está incorreto', async () => {
    await expect(
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
