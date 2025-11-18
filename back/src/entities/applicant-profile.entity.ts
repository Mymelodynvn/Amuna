
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./application.entity";
import { User} from "./users.entity"

@Entity('applicant-profile')
export class ApplicantProfile{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({
        type: 'varchar',
        length: 120,
        nullable: false
    })
    proffesion: string

    @Column({
        type: 'text',
        nullable: false
    })
    skills: string

    @Column({
        type: 'int',
        default: 0
    })
    experienceYears: number

    @Column({
        type: 'varchar',
        length: 120,
        nullable: false
    })
    location: string

    @Column({
        type: 'text',
        nullable: false
    })
    description: string

    @Column({
        type: 'bool',
        default: true
    })
    isActive: boolean

    @OneToOne(() => Application, (application) => application.applicant)
    application: Application

    @OneToOne(() => User, (user) => user.application)
    @JoinColumn({name: 'id_user'})
    user: User
}