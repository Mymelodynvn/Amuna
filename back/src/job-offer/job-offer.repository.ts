import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobOffer } from '../entities/job-offer.entity';

@Injectable()
export class JobOfferRepository {
  constructor(
    @InjectRepository(JobOffer)
    private readonly repo: Repository<JobOffer>,
  ) {}

  async findAll() {
    return this.repo.find();
  }

  async findById(id: string) {
    const offer = await this.repo.findOne({ where: { id_off: id } });
    if (!offer) throw new NotFoundException('Oferta no encontrada');
    return offer;
  }

  async create(data: Partial<JobOffer>) {
    const job = this.repo.create(data);
    return this.repo.save(job);
  }

  async update(id: string, data: Partial<JobOffer>) {
    await this.findById(id);
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.repo.delete(id);
    return { message: 'Oferta eliminada correctamente' };
  }
}