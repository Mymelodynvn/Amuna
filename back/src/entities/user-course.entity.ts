import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';
import { Course } from './course.entity';

@Entity('user_courses')
export class UserCourse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.userCourses)
    user: User;

    @ManyToOne(() => Course, (course) => course.userCourses)
    course: Course;
}
