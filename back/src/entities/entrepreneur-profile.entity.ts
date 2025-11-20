import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './users.entity';

@Entity({ name: 'entrepreneur_profile' })
export class EntrepreneurProfile {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    businessName: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    website: string;

    @Column({ type: 'bool', default: true })
    isActive: boolean;

    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user: User;
}
