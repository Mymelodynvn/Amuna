import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicantProfile } from './applicant-profile.entity';
import { JobOffer } from './job-offer.entity';
import { ApplicationStatus } from 'src/enum/application.enum';

@Entity('application')
export class Application {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @CreateDateColumn()
  applicationDate: Date;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  status: ApplicationStatus;

  @OneToOne(() => ApplicantProfile, (applicant) => applicant.application)
  @JoinColumn({ name: 'id_applicant' })
  applicant: ApplicantProfile;

  @OneToOne(() => JobOffer, (offer) => offer.applications)
  @JoinColumn({ name: 'id_offer' })
  offer: JobOffer;
    jobOffer: any;
}
