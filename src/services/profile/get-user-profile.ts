import type { UsersRepository } from 'src/repositories/users-repository';
import type { GetUserProfileResponseDTO } from './dto/GetUserProfileResponseDTO';
import type { GetUserProfileRequestDTO } from './dto/GetUserProfileRequestDTO';
import { ResourceNotFoundError } from './errors/resource-not-found';

export class GetUserProfileService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileRequestDTO): Promise<GetUserProfileResponseDTO> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return user;
  }
}
