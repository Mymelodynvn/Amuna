import { EntityRepository, Repository } from 'typeorm';
import { CompanyProfile } from '../entities/company-profile.entity';

@EntityRepository(CompanyProfile)
export class CompanyProfileRepository extends Repository<CompanyProfile> {}