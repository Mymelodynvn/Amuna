import { Module } from '@nestjs/common';
import { EntrepreneurProfileController } from './entrepreneur-profile.controller';
import { EntrepreneurProfileService } from './entrepreneur-profile.service';
import { EntrepreneurProfileRepository } from './entrepreneur-profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrepreneurProfile } from 'src/entities/entrepreneur-profile.entity';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntrepreneurProfile, User])],
  controllers: [EntrepreneurProfileController],
  providers: [EntrepreneurProfileService, EntrepreneurProfileRepository],
  exports: [EntrepreneurProfileRepository, EntrepreneurProfileService],
})
export class EntrepreneurProfileModule {}
