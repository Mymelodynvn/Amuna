import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CredentialsRepository } from './credentials.repository';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';

@Injectable()
export class CredentialsService {
  constructor(private readonly repo: CredentialsRepository) {}

  async getAll() {
    try {
      return await this.repo.findAll();
    } catch (error) {
      throw new BadRequestException('No se pudieron obtener credenciales');
    }
  }

  async getOne(id: string) {
    if (!id) throw new BadRequestException('El id es obligatorio');
    const cred = await this.repo.findOne(id);
    if (!cred) {
      throw new NotFoundException('Credencial no encontrada');
    }
    return cred;
  }

  async create(dto: CreateCredentialDto) {
    if (!dto.userId) {
      throw new BadRequestException('El userId es obligatorio para crear');
    }
    const nueva = await this.repo.createCredential(dto);
    return { mensaje: 'Credencial creada correctamente', credential: nueva };
  }

  async update(id: string, dto: UpdateCredentialDto) {
    console.log(`Servicio credenciales: actualizar credencial ${id}`, dto);
    if (!id) throw new BadRequestException('El id es obligatorio para actualizar');
    const cred = await this.repo.findOne(id);
    if (!cred) {
      throw new NotFoundException('Credencial no encontrada para actualizar');
    }
    const updated = await this.repo.updateCredential(cred, dto);
    return { mensaje: 'Credencial actualizada', credential: updated };
  }

  async delete(id: string) {
    if (!id) throw new BadRequestException('El id es obligatorio para desactivar');
    const cred = await this.repo.findOne(id);
    if (!cred) {
      throw new NotFoundException('Credencial no encontrada para borrar');
    }
    return await this.repo.softDelete(cred);
  }

  async restore(id: string) {
    if (!id) throw new BadRequestException('El id es obligatorio para restaurar');
    return await this.repo.restore(id);
  }
}
