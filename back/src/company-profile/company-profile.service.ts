import { Injectable, NotFoundException, BadRequestException, ConflictException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyProfile } from '../entities/company-profile.entity';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfile)
    private readonly companyRepository: Repository<CompanyProfile>,
  ) {}

  async findAll(): Promise<{ message: string; data: CompanyProfile[] }> {
    const companies = await this.companyRepository.find();
    return {
      message: 'Perfiles de empresa obtenidos exitosamente',
      data: companies,
    };
  }

  async findOne(id: string): Promise<{ message: string; data: CompanyProfile }> {
    const company = await this.companyRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(
        `Perfil de empresa con ID ${id} no encontrado`,
      );
    }
    return {
      message: 'Perfil de empresa obtenido exitosamente',
      data: company,
    };
  }

  async create(
    data: Partial<CompanyProfile>,
  ): Promise<{ message: string; data: CompanyProfile }> {
    // Verificar si ya existe un perfil con el mismo nombre
    const existingCompany = await this.companyRepository.findOne({
      where: { companyName: data.companyName },
    });
    if (existingCompany) {
      throw new ConflictException(
        `Ya existe un perfil de empresa con el nombre ${data.companyName}`,
      );
    }

    const newCompany = this.companyRepository.create(data);
    const savedCompany = await this.companyRepository.save(newCompany);
    return {
      message: 'Perfil de empresa creado exitosamente',
      data: savedCompany,
    };
  }

  async update(
    id: string,
    data: Partial<CompanyProfile>,
  ): Promise<{ message: string; data: CompanyProfile }> {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException(
        `Perfil de empresa con ID ${id} no encontrado para actualizar`,
      );
    }

    await this.companyRepository.update(id, data);
    const updatedCompany = await this.findOne(id);
    return {
      message: 'Perfil de empresa actualizado exitosamente',
      data: updatedCompany.data,
    };
  }

  async delete(id: string): Promise<{ message: string }> {
    const company = await this.findOne(id);
    if (!company) {
      throw new NotFoundException(
        `Perfil de empresa con ID ${id} no encontrado para eliminar`,
      );
    }

    await this.companyRepository.delete(id);
    return {
      message: `Perfil de empresa con ID ${id} eliminado exitosamente`,
    };
  }
}