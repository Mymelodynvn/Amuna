import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'entrepreneur_profile' })
export class EntrepreneurProfile {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    businessName: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    website: string;
}
