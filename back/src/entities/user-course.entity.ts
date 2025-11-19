import {
Entity,
PrimaryGeneratedColumn,
ManyToOne,
JoinColumn,
CreateDateColumn,
UpdateDateColumn,
Column,
Unique,
} from 'typeorm';
import { User } from './users.entity';
import { Course } from './course.entity';

@Entity('user_courses')
@Unique(['user', 'course'])
export class UserCourse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.userCourses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Course, (course) => course.userCourses, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'course_id'})
    course: Course;

    @Column({ type: 'varchar', length: 20, default: 'enrolled' })
    status: string;

    @Column({ type: 'int', default: 0 })
    progress: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}