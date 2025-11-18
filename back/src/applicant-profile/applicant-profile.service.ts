import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { ApplicantProfileRepository } from './applicant-profile.repository';
import { CreateApplicantProfileDto } from './Dtos/createApplicantProfile.dto';
import { UpdateApplicantProfileDto } from './Dtos/updateApplicantProfile.dto';

@Injectable()
export class ApplicantProfileService {
  constructor(
    private readonly applicantProfileRepository: ApplicantProfileRepository,
  ) {}

  async getAllApplicantProfilesService() {
    return this.applicantProfileRepository.getAllApplicantProfilesRepository();
  }

  async getApplicantProfileByIdService(uuid: string) {
    const applicantExisting =
      await this.applicantProfileRepository.getApplicantProfileByIdRepository(
        uuid,
      );
    if (!applicantExisting) {
      throw new NotFoundException('Applicant profile not found');
    }
    return applicantExisting;
  }

  async postCreateApplicantProfileService(
    createApplicantDto: CreateApplicantProfileDto,
    userUuid: string,
  ) {
    //metodo para ver si un usuario ya tiene un perfil de aspirante
    const existingProfile =
      await this.applicantProfileRepository.findByUserIdRepository(userUuid);

    if (existingProfile) {
      throw new BadRequestException(
        'This user already has an aspirant profile associated',
      );
    }
    return this.applicantProfileRepository.postCreateApplicantProfileRepository(
      createApplicantDto,
      userUuid,
    );
  }

  async putUpdateApplicantProfileService(
    updateApplicantDto: UpdateApplicantProfileDto,
  ) {
    const applicantProfileExisting =
      await this.applicantProfileRepository.getApplicantProfileByIdRepository(
        updateApplicantDto.uuid,
      );

    if (!applicantProfileExisting) {
      throw new NotFoundException('Aspirant profile not found');
    }
    return this.applicantProfileRepository.putUpdateApplicantProfileRepository(
      applicantProfileExisting,
      updateApplicantDto,
    );
  }

  async deleteApplicantProfileService(uuid: string) {
    const applicantExisting =
      await this.applicantProfileRepository.getApplicantProfileByIdRepository(
        uuid,
      );
    if (!applicantExisting) {
      throw new NotFoundException('Aspirant profile not found');
    }

    if (applicantExisting.isActive == false) {
      throw new BadRequestException(
        'This applicant profile has already been deleted',
      );
    }

    return this.applicantProfileRepository.deleteApplicantProfileService(
      applicantExisting,
    );
  }
}
