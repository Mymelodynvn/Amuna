import { Module } from '@nestjs/common';
import { JobOfferController } from './job-offer.controller';
import { JobOfferService } from './job-offer.service';
import { JobOfferRepository } from './job-offer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobOffer } from 'src/entities/job-offer.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([JobOffer])],
  controllers: [JobOfferController],
  providers: [JobOfferService, JobOfferRepository, RolesGuard]
})
export class JobOfferModule {}
