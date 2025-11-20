import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Credential } from 'src/entities/credentials.entity';
import { Application } from './application.entity';
import { Roles } from 'src/enum/roles.enum';
import { UserCourse } from './user-course.entity';   
import { EntrepreneurProfile } from 'src/entities/entrepreneur-profile.entity';

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  phone: string;

  @CreateDateColumn({ name: 'registered_at', type: 'timestamp', nullable: true })
  registeredAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({type: 'date', nullable: true})
    birthDate: Date;

  
  @OneToOne(() => Credential, (credential) => credential.user_id)
  @JoinColumn({ name: 'credential_id' })
  credential_id: Credential;


  @OneToOne(() => Application, (application) => application.offer)
  application: Application;


  @OneToOne(() => EntrepreneurProfile, (ep) => ep.user)
  entrepreneurProfile: EntrepreneurProfile;

  @OneToMany(() => UserCourse, (userCourse) => userCourse.user)
  userCourses: UserCourse[];
}
