import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationRepository } from './application.repository';
import { ApplicantProfileRepository } from 'src/applicant-profile/applicant-profile.repository';
import { CreateApplicationDto } from './Dtos/createApplication.dto';
import { ApplicationStatus } from 'src/enum/application.enum';
import { UpdateStatusDto } from './Dtos/updateStatus.dto';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly applicationRepository: ApplicationRepository,
    private readonly applicantProfileRepository: ApplicantProfileRepository,
  ) {}

  async getApplicationByProfileService(uuid: string) {
    const applicantExisting =
      await this.applicantProfileRepository.getApplicantProfileByIdRepository(
        uuid,
      );
    if (!applicantExisting) {
      throw new NotFoundException('Applicant profile not found');
    }

    const application =
      await this.applicationRepository.getApplicationByProfileRepository(uuid);

    if (!application) {
      throw new NotFoundException('No application found for this profile');
    }

    return application;
  }

  async getApplicationByIdService(uuid: string) {
    const application =
      await this.applicationRepository.findApplicationById(uuid);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async postCreateApplicationService(
    createApplicationDto: CreateApplicationDto,
  ) {
    const applicantexisting =
      await this.applicantProfileRepository.getApplicantProfileByIdRepository(
        createApplicationDto.applicantId,
      );
    if (!applicantexisting) {
      throw new NotFoundException('Applicant profile not found');
    }

    const applicationExisting =
      await this.applicationRepository.findByApplicantAndOffer(
        createApplicationDto.applicantId,
        createApplicationDto.offerId,
      );
    if (applicationExisting) {
      throw new BadRequestException(
        'This aspirant has already applied to this offer',
      );
    }

    return this.applicationRepository.postCreateApplicationRepository(
      createApplicationDto,
    );
  }

  async updateApplicationStatusService(
    uuid: string,
    updateStatusDto: UpdateStatusDto,
  ) {
    const application =
      await this.applicationRepository.findApplicationById(uuid);
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    return this.applicationRepository.updateApplicationStatusRepository(
      application,
      updateStatusDto,
    );
  }

  async deleteApplicationService(uuid: string) {
    const application =
      await this.applicationRepository.findApplicationById(uuid);

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return this.applicationRepository.deleteApplicationRepository(application);
  }
}
