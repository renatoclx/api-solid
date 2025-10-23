import type { GymsRepository } from 'src/repositories/gyms-repository';
import type { FetchNearbyGymsRequestDTO } from './dto/FetchNearbyGymsRequestDTO';
import type { FetchNearbyGymsResponseDTO } from './dto/FetchNearbyGymsResponseDTO';

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsRequestDTO): Promise<FetchNearbyGymsResponseDTO> {
    const gyms = await this.gymsRepository.nearbyGyms(userLatitude, userLongitude);

    return gyms;
  }
}
