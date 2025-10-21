import { expect, describe, it } from 'vitest';
import { RegisterService } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists';
import { beforeEach } from 'vitest';

// Testes Unitários - Testar independente de suas dependências
// Testes Unitários não chegam a camadas externas da aplicação
let inUserRepository: InMemoryUsersRepository;
let registerService: RegisterService;

describe('Register Use Case', () => {
  beforeEach(() => {
    inUserRepository = new InMemoryUsersRepository();
    registerService = new RegisterService(inUserRepository);
  });

  it('Senha deve ser criptografada após o cadastro', async () => {
    const { user } = await registerService.execute({
      name: 'Fulano',
      email: 'fulano@teste.com',
      password: '123456',
    });

    const isPasswordCorrect = await compare('123456', user.password_hash);
    expect(isPasswordCorrect).toBe(true);
  });

  it('Não posso ter usuário com e-mail repetido', async () => {
    const email = 'fulano@teste.com';

    await registerService.execute({
      name: 'Fulano',
      email,
      password: '123456',
    });

    // Sempre que uso o expect com uma promise, preciso usar o await
    await expect(
      registerService.execute({
        name: 'Fulano',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('Criar um usuario', async () => {
    const { user } = await registerService.execute({
      name: 'Fulano',
      email: 'fulano@teste.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
