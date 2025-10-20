import type { UsersRepository } from 'src/repositories/users-repository';
import type { AuthenticateRequestDTO } from './dto/AuthenticateRequestDTO';
import type { AuthenticateResponseDTO } from './dto/AuthenticateResponseDTO';
import { InvalidCredentialsError } from './errors/invalid-credentials';
import { compare } from 'bcryptjs';

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: AuthenticateRequestDTO): Promise<AuthenticateResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatched = await compare(password, user.password_hash);

    if (!doesPasswordMatched) {
      throw new InvalidCredentialsError();
    }

    return user;
  }
}
