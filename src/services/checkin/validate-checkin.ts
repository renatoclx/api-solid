import type { GymsRepository } from 'src/repositories/gyms-repository';
import type { ValidateCheckInRequestDTO } from './dto/ValidateCheckInRequestDTO';
import type { ValidateCheckInResponseDTO } from './dto/ValidateCheckInResponseDTO';
import type { CheckInsRepository } from 'src/repositories/checkins-repository';
import { ResourceNotFoundError } from '../profile/errors/resource-not-found';
import { CheckInValidateHourError } from './errors/checkin-validate-hour';
import dayjs from 'dayjs';

export class ValidateCheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({ checkInId }: ValidateCheckInRequestDTO): Promise<ValidateCheckInResponseDTO> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    // Comparação das datas
    const distanceInMinutesFromCheckIns = dayjs(new Date()).diff(checkIn.created_at, 'minutes');

    if (distanceInMinutesFromCheckIns > 20) {
      throw new CheckInValidateHourError();
    }

    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);

    return checkIn;
  }
}
