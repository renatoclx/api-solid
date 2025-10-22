import type { GymsRepository } from 'src/repositories/gyms-repository';
import { SearchGymsRequestDTO } from './dto/SearchGymsRequestDTO';
import { SearchGymsResponseDTO } from './dto/SearchGymsResponseDTO';

export class SearchGymsService {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ q, page }: SearchGymsRequestDTO): Promise<SearchGymsResponseDTO> {
    const gyms = await this.gymsRepository.searchMany(q, page);

    return gyms;
  }
}
