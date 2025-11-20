import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntrepreneurProfile } from 'src/entities/entrepreneur-profile.entity';
import { Repository } from 'typeorm';
import { CreateEntrepreneurProfileDto } from './Dtos/createEntrepreneurProfile.dto';
import { UpdateEntrepreneurProfileDto } from './Dtos/updateEntrepreneurProfile.dto';

@Injectable()
export class EntrepreneurProfileRepository {
  constructor(
    @InjectRepository(EntrepreneurProfile)
    private readonly entrepreneurDB: Repository<EntrepreneurProfile>,
  ) {}

  async getAllEntrepreneurProfilesRepository() {
    return this.entrepreneurDB.find({ relations: ['user'] });
  }

  async getEntrepreneurProfileByIdRepository(uuid: string) {
    return this.entrepreneurDB.findOne({ where: { uuid: uuid }, relations: ['user'] });
  }

  async findByUserIdRepository(uuid: string) {
    return this.entrepreneurDB.findOne({ where: { user: { userId: uuid } }, relations: ['user'] });
  }

  async postCreateEntrepreneurProfileRepository(
    createEntrepreneurDto: CreateEntrepreneurProfileDto,
    userUuid: string,
  ) {
    const entrepreneur = this.entrepreneurDB.create({
      businessName: createEntrepreneurDto.businessName,
      description: createEntrepreneurDto.description,
      website: createEntrepreneurDto.website,
      user: { userId: userUuid },
    });
    return this.entrepreneurDB.save(entrepreneur);
  }

  async putUpdateEntrepreneurProfileRepository(
    entrepreneurExisting: EntrepreneurProfile,
    updateEntrepreneurDto: UpdateEntrepreneurProfileDto,
  ) {
    if (updateEntrepreneurDto.businessName) {
      entrepreneurExisting.businessName = updateEntrepreneurDto.businessName;
    }

    if (updateEntrepreneurDto.description) {
      entrepreneurExisting.description = updateEntrepreneurDto.description;
    }

    if (updateEntrepreneurDto.website) {
      entrepreneurExisting.website = updateEntrepreneurDto.website;
    }

    await this.entrepreneurDB.save(entrepreneurExisting);
    return { message: 'Entrepreneur profile update' };
  }

  async deleteEntrepreneurProfileService(entrepreneurExisting: EntrepreneurProfile) {
    entrepreneurExisting.isActive = false;
    await this.entrepreneurDB.save(entrepreneurExisting);
    return { message: 'Entrepreneur profile deleted' };
  }
}