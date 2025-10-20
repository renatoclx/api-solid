import type { GymsRepository } from 'src/repositories/gyms-repository';
import type { CheckInRequestDTO } from './dto/CheckInRequestDTO';
import type { CheckInResponseDTO } from './dto/CheckinResponseDTO';
import type { CheckInsRepository } from 'src/repositories/checkins-repository';
import { ResourceNotFoundError } from '../profile/errors/resource-not-found';
import { CheckInOnSameDateError } from './errors/checkin-same-date';
import { getDistanceBetweenCoordinates } from 'src/utils/get-distance-between-coordinates';
import { MaxDistanceError } from './errors/max-distance';

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({ userId, gymId, userLatitude, userLongitude }: CheckInRequestDTO): Promise<CheckInResponseDTO> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSameDate) {
      throw new CheckInOnSameDateError();
    }

    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: Number(gym.latitude), longitude: Number(gym.longitude) },
    );

    const MAX_DISTANCE = 0.1;

    if (distance > MAX_DISTANCE) {
      throw new MaxDistanceError();
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return checkIn;
  }
}
