import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './application.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/entities/application.entity';
import { ApplicantProfile } from 'src/entities/applicant-profile.entity';
import { JobOffer } from 'src/entities/job-offer.entity';
import { ApplicantProfileModule } from '../applicant-profile/applicant-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Application, ApplicantProfile, JobOffer]),
    ApplicantProfileModule,
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService, ApplicationRepository],
  exports: [ApplicationRepository],
})
export class ApplicationModule {}
