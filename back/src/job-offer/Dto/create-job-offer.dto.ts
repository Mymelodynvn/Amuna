import {
  IsUUID,
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  IsDateString,
  Length,
} from 'class-validator';
import { jobMode } from 'src/enum/jobMode.enum';
import { ApplicationStatus } from 'src/enum/application.enum';


export class CreateJobOfferDto {
  @IsUUID()
  id_company: string;

  @IsUUID()
  id_category: string;

  @IsString()
  @Length(1, 150)
  qualif: string;

  @IsString()
  descr: string;

  @IsOptional()
  @IsNumber()
  salary?: number;

  @IsEnum(jobMode)
  mode: jobMode;

  @IsDateString()
  publication: Date;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}