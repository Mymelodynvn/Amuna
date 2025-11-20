import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CompanyProfile } from './company-profile.entity';
import { Category } from './categiries.entity';
import { Application } from './application.entity';
import { jobMode } from 'src/enum/jobMode.enum';
import { ApplicationStatus } from 'src/enum/application.enum';

@Entity('job_offers')
export class JobOffer {
  @PrimaryGeneratedColumn('uuid')
  id_off: string;

  @Column('uuid')
  id_company: string;

  @Column('uuid')
  id_category: string;

  @Column({ type: 'varchar', length: 150 })
  qualif: string;

  @Column({ type: 'text' })
  descr: string;

  @Column({ type: 'decimal', nullable: true })
  salary: number;

  @Column({
     type: 'enum',
  enum: jobMode,
})
mode: jobMode;

  @Column({ type: 'timestamp' })
  publication: Date;

  @Column({
     type: 'enum',
  enum: ApplicationStatus,
  default: ApplicationStatus.PENDING,
})
status: ApplicationStatus;

  // FK Company (muchas ofertas para una empresa)
  @ManyToOne(() => CompanyProfile, (company) => company.jobOffers)
  @JoinColumn({ name: 'id_company' })
  company: CompanyProfile;

  // FK Category
  @ManyToOne(() => Category, (category) => category.jobOffers, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'id_category' })
  category: Category;

  //Relation with Applications
  @OneToMany(() => Application, (application) => application.offer)
  applications: Application[];
}
