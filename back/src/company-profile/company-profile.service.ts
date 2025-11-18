import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyProfile } from '../entities/company-profile.entity';

@Injectable()
export class CompanyProfileService {
  constructor(
    @InjectRepository(CompanyProfile)
    private readonly companyRepository: Repository<CompanyProfile>,
  ) {}

  async findAll(): Promise<CompanyProfile[]> {
    return this.companyRepository.find();
  }

  async findOne(id: string): Promise<CompanyProfile | null> {
    return this.companyRepository.findOne({ where: { id } });
  }

  async create(data: Partial<CompanyProfile>): Promise<CompanyProfile> {
    const newCompany = this.companyRepository.create(data);
    return this.companyRepository.save(newCompany);
  }

  async update(id: string, data: Partial<CompanyProfile>): Promise<CompanyProfile | null> {
    await this.companyRepository.update(id, data);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.companyRepository.delete(id);
  }
}