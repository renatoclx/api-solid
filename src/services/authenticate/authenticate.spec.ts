import { expect, describe, it } from 'vitest';
import { AuthenticateService } from './authenticate';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials';
import { hash } from 'bcryptjs';
import { beforeEach } from 'vitest';

// Para não ter repetição de instância, cria-se variáveis globais tipadas que
// serão atribuidas antes de cada teste rodar (beforeEach())
let inMemoryUserRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe('Validar acesso a aplicação pelo e-mail', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(inMemoryUserRepository);
  });

  it('Autenticar usuário', async () => {
    await expect(
      sut.execute({
        email: 'ciclano@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('Senha Inválida', async () => {
    await inMemoryUserRepository.create({
      name: 'Ciclano',
      email: 'ciclano@teste.com',
      password_hash: await hash('123456', 6),
    });

    await expect(
      sut.execute({
        email: 'ciclano@teste.com',
        password: '123455', // senha incorreta
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
