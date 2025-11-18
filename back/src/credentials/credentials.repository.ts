import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from 'src/entities/credentials.entity';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CredentialsRepository {
  constructor(
    @InjectRepository(Credential)
    private readonly credDB: Repository<Credential>,
  ) {}

  async findAll() {
    return this.credDB.find({ relations: ['user_id'] });
  }

  async findOne(id: string) {
    return this.credDB.findOne({
      where: { credentialId: id },
      relations: ['user_id'],
    });
  }

  async getCredentialByUsername(userName: string) {
    return this.credDB.findOne({
      where: { userName },
      relations: ['user_id'],
    });
  }

  async createCredential(dto: CreateCredentialDto) {
    // valida userName sea único
    const exists = await this.credDB.findOne({ where: { userName: dto.userName } });
    if (exists) throw new ConflictException('El userName ya está en uso');

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(dto.password, salt);

    const nueva = this.credDB.create({
      user_id: { userId: dto.userId },
      userName: dto.userName,
      credentialType: dto.credentialType,
      identification: dto.identification,
      password: hashed,
      token: dto.token,
      isVerified: dto.isVerified ?? false,
    });

    const guardada = await this.credDB.save(nueva);
    return guardada;
  }

  async updateCredential(cred: Credential, dto: UpdateCredentialDto) {
    if (dto.password) {
      const salt = await bcrypt.genSalt();
      dto.password = await bcrypt.hash(dto.password, salt);
    }
    Object.assign(cred, dto);
    const updated = await this.credDB.save(cred);
    return updated;
  }

  async softDelete(cred: Credential) {
    await this.credDB.softDelete(cred.credentialId);
    return { message: `Credencial ${cred.credentialId} desactivada` };
  }

  async restore(id: string) {
    await this.credDB.restore(id);
    return { message: `Credencial ${id} restaurada` };
  }
}
