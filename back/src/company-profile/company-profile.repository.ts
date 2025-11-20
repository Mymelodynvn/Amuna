import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CompanyProfile } from '../entities/company-profile.entity';
import { CreateCompanyProfileDto } from './DTOS/create-company-profile.dto';
import { UpdateCompanyProfileDto } from './DTOS/update-company-profile.dto';

@Injectable()
@EntityRepository(CompanyProfile)
export class CompanyProfileRepository extends Repository<CompanyProfile> {
  // Obtener todos los perfiles de empresa
  async findAllProfiles(): Promise<CompanyProfile[]> {
    return this.find();
  }

  // Buscar un perfil de empresa por ID
  async findProfileById(id: string): Promise<CompanyProfile> {
    const profile = await this.findOne({ where: { id } });
    if (!profile) {
      throw new NotFoundException(`Perfil de empresa con ID ${id} no encontrado`);
    }
    return profile;
  }

  // Crear un nuevo perfil de empresa
  async createProfile(dto: CreateCompanyProfileDto): Promise<CompanyProfile> {
    const newProfile = this.create(dto);
    return this.save(newProfile);
  }

  // Actualizar un perfil de empresa existente
  async updateProfile(id: string, dto: UpdateCompanyProfileDto): Promise<CompanyProfile> {
    const profile = await this.findProfileById(id);
    Object.assign(profile, dto);
    return this.save(profile);
  }

  // Eliminar un perfil de empresa
  async deleteProfile(id: string): Promise<void> {
    const profile = await this.findProfileById(id);
    await this.remove(profile);
  }
}