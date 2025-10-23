import type { GetUserMetricsRequestDTO } from './dto/GetUserMetricsRequestDTO';
import type { GetUserMetricsResponseDTO } from './dto/GetUserMetricsResponseDTO';
import type { CheckInsRepository } from 'src/repositories/checkins-repository';

export class GetUserMetricsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId }: GetUserMetricsRequestDTO): Promise<GetUserMetricsResponseDTO> {
    return this.checkInsRepository.countByUserId(userId);
  }
}
