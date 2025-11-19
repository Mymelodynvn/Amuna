import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CourseRepository } from './course.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
  exports: [CourseService],
})
export class CourseModule {}
