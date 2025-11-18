import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicationEntity } from '../entities/publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(PublicationEntity)
    private readonly publicationRepo: Repository<PublicationEntity>,
  ) {}

  findAll(): Promise<PublicationEntity[]> {
    return this.publicationRepo.find();
  }

  async findOne(id: number): Promise<PublicationEntity> {
    const publication = await this.publicationRepo.findOne({ where: { id: id.toString() } });
    if (!publication) throw new NotFoundException('Publication not found');
    return publication;
  }

  create(data: CreatePublicationDto): Promise<PublicationEntity> {
    const publication = this.publicationRepo.create(data);
    return this.publicationRepo.save(publication);
  }

  async update(id: number, data: UpdatePublicationDto): Promise<PublicationEntity> {
    await this.findOne(id);
    await this.publicationRepo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.publicationRepo.delete(id);
  }
}