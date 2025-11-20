import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Credential } from 'src/entities/credentials.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credential]), 
  ],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
  exports: [UsersRepository, UserService, TypeOrmModule],
})
export class UserModule {}
