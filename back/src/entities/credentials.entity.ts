import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, DeleteDateColumn, CreateDateColumn } from 'typeorm';
import { User } from 'src/entities/users.entity';
import { Roles } from 'src/enum/roles.enum';

@Entity({ name: 'Credentials' })
export class Credential {
  @PrimaryGeneratedColumn('uuid')
  credentialId: string; 

  @Column({ type: 'varchar', length: 25, unique: true, nullable: true })
  userName: string; 

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string; 

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  roles: Roles;

  @Column({ type: 'varchar', nullable: true, unique: true, length: 30 })
  identification: string; 

  @Column({ type: 'varchar', length: 50, nullable: true })
  credentialType: string;

  @Column({ nullable: true })
  token: string; 

  @CreateDateColumn({ name: 'token_created_at', type: 'timestamp', nullable: true })
  tokenCreatedAt: Date;

  @Column({ name: 'token_expires_at', type: 'timestamp', nullable: true })
  tokenExpiresAt: Date;

  @Column({ name: 'is_verified', default: false, type: 'boolean' })
  isVerified: boolean;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date;

  // relación 1 a 1 con User
  @OneToOne(() => User, (user) => user.credential_id)
  @JoinColumn({ name: 'user_id' })
  user_id: User;
}
