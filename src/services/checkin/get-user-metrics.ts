import { GetUserMetricsRequestDTO } from './dto/GetUserMetricsRequestDTO';
import { GetUserMetricsResponseDTO } from './dto/GetUserMetricsResponseDTO';
import type { CheckInsRepository } from 'src/repositories/checkins-repository';

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsRequestDTO): Promise<GetUserMetricsResponseDTO> {
    const checkInCount = await this.checkInsRepository.countByUserId(userId);

    return checkInCount;
  }
}
