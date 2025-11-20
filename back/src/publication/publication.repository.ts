import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicationEntity } from '../entities/publication.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationRepository {
  constructor(
    @InjectRepository(PublicationEntity)
    private readonly publicationRepo: Repository<PublicationEntity>,
  ) {}

  async findAll(): Promise<PublicationEntity[]> {
    return this.publicationRepo.find();
  }

  async findOne(id: string): Promise<PublicationEntity> {
    const publication = await this.publicationRepo.findOne({ where: { id } });
    if (!publication) {
      throw new NotFoundException('Publicación no encontrada');
    }
    return publication;
  }

  async create(data: CreatePublicationDto): Promise<PublicationEntity> {
    const publication = this.publicationRepo.create(data);
    return this.publicationRepo.save(publication);
  }

  async update(id: string, data: UpdatePublicationDto): Promise<PublicationEntity> {
    const publication = await this.findOne(id);
    Object.assign(publication, data);
    return this.publicationRepo.save(publication);
  }

  async remove(id: string): Promise<void> {
    const publication = await this.findOne(id);
    await this.publicationRepo.remove(publication);
  }
}