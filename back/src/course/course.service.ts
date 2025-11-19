import { Injectable } from '@nestjs/common';
import { CourseRepository, Course } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(private readonly repo: CourseRepository) {}

    create(dto: CreateCourseDto): Course {
        return this.repo.createCourse(dto);
    }

    findAll(): Course[] {
        return this.repo.findAll();
}

    findOne(id: string): Course | undefined {
        return this.repo.findOneById(id);
    }

    update(id: string, dto: UpdateCourseDto): Course | undefined {
        return this.repo.updateCourse(id, dto);
    }

    remove(id: string): Course | undefined {
        return this.repo.deleteCourse(id);
    }
}
