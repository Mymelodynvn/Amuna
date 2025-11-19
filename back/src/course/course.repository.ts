import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

export interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
}

@Injectable()
export class CourseRepository {
    private courses: Course[] = [];

createCourse(dto: CreateCourseDto): Course {
    const newCourse: Course = {
    id: Date.now().toString(),
    ...dto,
    };
    this.courses.push(newCourse);
    return newCourse;
}

findAll(): Course[] {
    return this.courses;
}

findOneById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id);
}

updateCourse(id: string, dto: UpdateCourseDto): Course | undefined {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    this.courses[index] = {
    ...this.courses[index],
    ...dto,
    };

    return this.courses[index];
    }

deleteCourse(id: string): Course | undefined {
    const index = this.courses.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    const deleted = this.courses[index];
    this.courses.splice(index, 1);

    return deleted;
}
}