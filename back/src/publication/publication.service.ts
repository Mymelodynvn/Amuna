import { Injectable } from '@nestjs/common';
import { PublicationRepository } from './publication.repository';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Injectable()
export class PublicationService {
  constructor(private readonly publicationRepo: PublicationRepository) {}

  findAll() {
    return this.publicationRepo.findAll();
  }

  findOne(id: string) {
    return this.publicationRepo.findOne(id);
  }

  create(dto: CreatePublicationDto) {
    return this.publicationRepo.create(dto);
  }

  update(id: string, dto: UpdatePublicationDto) {
    return this.publicationRepo.update(id, dto);
  }

  remove(id: string) {
    return this.publicationRepo.remove(id);
  }
}