import { Module } from '@nestjs/common';
import { ApplicantProfileController } from './applicant-profile.controller';
import { ApplicantProfileService } from './applicant-profile.service';
import { ApplicantProfileRepository } from './applicant-profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantProfile } from 'src/entities/applicant-profile.entity';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicantProfile, User])],

  controllers: [ApplicantProfileController],

  providers: [
    ApplicantProfileService,
    ApplicantProfileRepository,
  ],

  exports: [
    ApplicantProfileRepository,
    ApplicantProfileService,
  ],
})
export class ApplicantProfileModule {}
