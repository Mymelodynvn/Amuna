import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { EntrepreneurProfileRepository } from './entrepreneur-profile.repository';
import { CreateEntrepreneurProfileDto } from './Dtos/createEntrepreneurProfile.dto';
import { UpdateEntrepreneurProfileDto } from './Dtos/updateEntrepreneurProfile.dto';

@Injectable()
export class EntrepreneurProfileService {
	constructor(
		private readonly entrepreneurProfileRepository: EntrepreneurProfileRepository,
	) {}

	async getAllEntrepreneurProfilesService() {
		return this.entrepreneurProfileRepository.getAllEntrepreneurProfilesRepository();
	}

	async getEntrepreneurProfileByIdService(uuid: string) {
		const existing = await this.entrepreneurProfileRepository.getEntrepreneurProfileByIdRepository(uuid);
		if (!existing) {
			throw new NotFoundException('Entrepreneur profile not found');
		}
		return existing;
	}

	async postCreateEntrepreneurProfileService(createDto: CreateEntrepreneurProfileDto, userUuid: string) {
		const existingProfile = await this.entrepreneurProfileRepository.findByUserIdRepository(userUuid);
		if (existingProfile) {
			throw new BadRequestException('This user already has an entrepreneur profile associated');
		}
		return this.entrepreneurProfileRepository.postCreateEntrepreneurProfileRepository(createDto, userUuid);
	}

	async putUpdateEntrepreneurProfileService(updateDto: UpdateEntrepreneurProfileDto) {
		const existing = await this.entrepreneurProfileRepository.getEntrepreneurProfileByIdRepository(updateDto.uuid);
		if (!existing) {
			throw new NotFoundException('Entrepreneur profile not found');
		}
		return this.entrepreneurProfileRepository.putUpdateEntrepreneurProfileRepository(existing, updateDto);
	}

	async deleteEntrepreneurProfileService(uuid: string) {
		const existing = await this.entrepreneurProfileRepository.getEntrepreneurProfileByIdRepository(uuid);
		if (!existing) {
			throw new NotFoundException('Entrepreneur profile not found');
		}

		if (existing.isActive == false) {
			throw new BadRequestException('This entrepreneur profile has already been deleted');
		}

		return this.entrepreneurProfileRepository.deleteEntrepreneurProfileService(existing);
	}
}
