import {
Column,
CreateDateColumn,
Entity,
OneToMany,
PrimaryGeneratedColumn,
UpdateDateColumn,
} from 'typeorm';

import { UserCourse } from './user-course.entity';
import { PublicationEntity } from './publication.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', nullable: true })
    category: string | null;

    @Column({ type: 'int', default: 0 })
    durationHours: number;

    @Column({
        type: 'enum',
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
    })
        status: 'draft' | 'published' | 'archived';

    @Column({ type: 'varchar', nullable: true })
    thumbnailUrl: string;

    @Column({ type: 'boolean', default: false })
    isFree: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @OneToMany(() => UserCourse, (userCourse) => userCourse.course)
    userCourses: UserCourse[];


}
