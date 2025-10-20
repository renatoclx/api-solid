import type { GymsRepository } from 'src/repositories/gyms-repository';
import { FetchNearbyGymsRequestDTO } from './dto/FetchNearbyGymsRequestDTO';
import { FetchNearbyGymsResponseDTO } from './dto/FetchNearbyGymsResponseDTO';

export class FetchNearbyGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ userLatitude, userLongitude }: FetchNearbyGymsRequestDTO): Promise<FetchNearbyGymsResponseDTO> {
    const gyms = await this.gymsRepository.nearbyGyms(userLatitude, userLongitude);

    return gyms;
  }
}
