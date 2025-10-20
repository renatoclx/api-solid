import type { CheckInsRepository } from 'src/repositories/checkins-repository';
import type { FetchUserHistoryRequestDTO } from './dto/FetchUserHistoryRequestDTO';
import type { FetchUserHistoryResponseDTO } from './dto/FetchUserHistoryResponseDTO';

export class FetchUserHistoryService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, page }: FetchUserHistoryRequestDTO): Promise<FetchUserHistoryResponseDTO> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);

    return checkIns;
  }
}
