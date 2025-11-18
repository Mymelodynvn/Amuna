import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Credential } from 'src/entities/credentials.entity';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Credential])],
  providers: [CredentialsService, CredentialsRepository],
  controllers: [CredentialsController],
  exports: [CredentialsService, CredentialsRepository],
})
export class CredentialsModule {}
