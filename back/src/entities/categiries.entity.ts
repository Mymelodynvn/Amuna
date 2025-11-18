import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { JobOffer } from './job-offer.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id_category: string;

  @Column({ type: 'text' })
  categ: string;

  @Column({ type: 'text', nullable: true })
  descr: string;

  //relacion con  job offers
  @OneToMany(() => JobOffer, (jobOffer) => jobOffer.category)
  jobOffers: JobOffer[];
}