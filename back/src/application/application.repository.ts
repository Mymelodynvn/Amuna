import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/entities/application.entity';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './Dtos/createApplication.dto';
import { ApplicantProfile } from 'src/entities/applicant-profile.entity';
import { JobOffer } from 'src/entities/job-offer.entity';
import { UpdateStatusDto } from './Dtos/updateStatus.dto';

@Injectable()
export class ApplicationRepository {
  constructor(
    @InjectRepository(Application)
    private readonly applicationDB: Repository<Application>,

    @InjectRepository(ApplicantProfile)
    private readonly applicantDB: Repository<ApplicantProfile>,

    @InjectRepository(JobOffer)
    private readonly jobOfferDB: Repository<JobOffer>,
  ) {}

  async getApplicationByProfileRepository(uuid: string) {
    return await this.applicationDB.find({
      where: { applicant: { uuid: uuid } },
      relations: ['applicant', 'offer'],
    });
  }

  async findByApplicantAndOffer(applicantId: string, offerId: string) {
    return this.applicationDB.findOne({
      where: {
        applicant: { uuid: applicantId },
        offer: { id_off: offerId },
      },
      relations: ['applicant', 'offer'],
    });
  }

  findApplicationById(uuid: string) {
    return this.applicationDB.findOne({
      where: { uuid: uuid },
    });
  }

  async postCreateApplicationRepository(
    createApplicationDto: CreateApplicationDto,
  ) {
    const applicant = await this.applicantDB.findOne({
      where: { uuid: createApplicationDto.applicantId },
    });

    if (!applicant) throw new NotFoundException('Applicant profile not found');

    const offer = await this.jobOfferDB.findOne({
      where: { id_off: createApplicationDto.offerId },
    });

    if (!offer) throw new NotFoundException('Job offer not found');

    const application = this.applicationDB.create({
      applicant: applicant,
      offer: offer,
    });

    return this.applicationDB.save(application);
  }

  async updateApplicationStatusRepository(
    application: Application,
    updateStatusDto: UpdateStatusDto,
  ) {
    application.status = updateStatusDto.status;
    await this.applicationDB.save(application);
    return { message: 'Application status updated' };
  }

  async deleteApplicationRepository(application: Application) {
    await this.applicationDB.remove(application);
    return { message: 'Application deleted successfully' };
  }
}
