import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Repository } from 'typeorm';
import { Credential } from './entities/credentials.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Roles } from './enum/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenidos a Sena mujeres digitales';
  }
}

@Injectable()
export class DataLoaderUsers implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userDataBase: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialDataBase: Repository<Credential>,
  ) {}

  async onModuleInit() {
    const usersCount = await this.userDataBase.count();

    if (usersCount === 0) {
      console.log('Cargando usuarios iniciales...');
      const queryRunner =
        this.userDataBase.manager.connection.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        const filePath = path.join(process.cwd(), 'src', 'utils', 'data.json');
        console.log(filePath)
        const rawData = fs.readFileSync(filePath, 'utf-8');
        console.log(rawData)
        const users = JSON.parse(rawData) as Array<{
          username: string;
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          password: string;
          name: string;
          address: string;
          phoneNumber: string;
          birthDate: string;
          roles: string;
        }>;

        await Promise.all(
          users.map(async (user) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const hashedPassword: string = await bcrypt.hash(user.password, 10);
            const newCredential = this.credentialDataBase.create({
              userName: user.username,
              password: hashedPassword,
              roles: user.roles as Roles,
            });
            await queryRunner.manager.save(newCredential);

            const newUser = this.userDataBase.create({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: String(user.phone),
              birthDate: new Date(user.birthDate),
              credential_id: newCredential,
            });
            await queryRunner.manager.save(newUser);
          }),
        );
        await queryRunner.commitTransaction();
        console.log('Usuarios Precargados correctamente');
      } catch (error) {
        console.error('Error al precargar usuario:', error);
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }
    } else {
      console.log('Los usuarios ya existen en la base de datos');
    }
  }
}