import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationEntity } from '../entities/publication.entity';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { PublicationRepository } from './publication.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PublicationEntity])],
  controllers: [PublicationController],
  providers: [PublicationService, PublicationRepository],
  exports: [PublicationRepository],
})
export class PublicationModule {}