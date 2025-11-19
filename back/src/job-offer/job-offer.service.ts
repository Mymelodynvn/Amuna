import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateJobOfferDto } from './Dto/create-job-offer.dto';
import { UpdateJobOfferDto } from './Dto/update-job-offer.dto';
import { JobOfferRepository } from './job-offer.repository';

@Injectable()
export class JobOfferService {
  constructor(private readonly repository: JobOfferRepository) {}

  async create(dto: CreateJobOfferDto) {
    try {
      return await this.repository.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findById(id);
  }

  update(id: string, dto: UpdateJobOfferDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
