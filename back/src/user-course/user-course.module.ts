import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourseController } from './user-course.controller';
import { UserCourseService } from './user-course.service';
import { UserCourseRepository } from './user-course.repository';
import { UserCourse } from 'src/entities/user-course.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourse]), AuthModule],
  controllers: [UserCourseController],
  providers: [UserCourseService, UserCourseRepository],
  exports: [UserCourseService, UserCourseRepository],
})
export class UserCourseModule {}
