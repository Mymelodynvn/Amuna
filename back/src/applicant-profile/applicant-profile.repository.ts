import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicantProfile } from 'src/entities/applicant-profile.entity';
import { Repository } from 'typeorm';
import { CreateApplicantProfileDto } from './Dtos/createApplicantProfile.dto';
import { UpdateApplicantProfileDto } from './Dtos/updateApplicantProfile.dto';

@Injectable()
export class ApplicantProfileRepository {
  constructor(
    @InjectRepository(ApplicantProfile)
    private readonly applicantProfileDB: Repository<ApplicantProfile>,
  ) {}

  async getAllApplicantProfilesRepository() {
    const applicantProfiles = await this.applicantProfileDB.find({
      relations: ['user'],
    });
    return applicantProfiles;
  }

  async getApplicantProfileByIdRepository(uuid: string) {
    return await this.applicantProfileDB.findOne({
      where: { uuid: uuid },
      relations: ['user'],
    });
  }

  async findByUserIdRepository(uuid: string) {
    return this.applicantProfileDB.findOne({
      where: { user: { userId: uuid } },
      relations: ['user'],
    });
  }

  async postCreateApplicantProfileRepository(
    createApplicantDto: CreateApplicantProfileDto,
    userUuid: string,
  ) {
    const applicant = this.applicantProfileDB.create({
      proffesion: createApplicantDto.proffesion,
      skills: createApplicantDto.skills,
      experienceYears: createApplicantDto.experienceYears,
      location: createApplicantDto.location,
      description: createApplicantDto.description,
      user: { userId: userUuid },
    });
    return this.applicantProfileDB.save(applicant);
  }

  async putUpdateApplicantProfileRepository(
    applicantProfileExisting: ApplicantProfile,
    updateApplicantDto: UpdateApplicantProfileDto,
  ) {
    if (updateApplicantDto.proffesion) {
      applicantProfileExisting.proffesion = updateApplicantDto.proffesion;
    }

    if (updateApplicantDto.skills) {
      applicantProfileExisting.skills = updateApplicantDto.skills;
    }

    if (updateApplicantDto.description) {
      applicantProfileExisting.description = updateApplicantDto.description;
    }

    if (updateApplicantDto.location) {
      applicantProfileExisting.location = updateApplicantDto.location;
    }

    await this.applicantProfileDB.save(applicantProfileExisting);
    return { message: 'Applicant profile update' };
  }

  async deleteApplicantProfileService(applicantExisting: ApplicantProfile) {
    applicantExisting.isActive = false;
    await this.applicantProfileDB.save(applicantExisting);
    return { message: 'Applicant profile deleted' };
  }
}
