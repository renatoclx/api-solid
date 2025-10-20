import type { GymsRepository } from 'src/repositories/gyms-repository';
import type { GymServiceRequestDTO } from './dto/GymServiceRequestDTO';
import type { GymServiceResponseDTO } from './dto/GymServiceResponseDTO';

export class CreateGymService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: GymServiceRequestDTO): Promise<GymServiceResponseDTO> {
    const gym = this.gymsRepository.create({ title, description, phone, latitude, longitude });

    return gym;
  }
}
