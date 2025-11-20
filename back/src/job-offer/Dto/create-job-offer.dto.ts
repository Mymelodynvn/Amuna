import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'ID de la empresa que publica la oferta',
    example: 'f3b8b6dd-12f0-4f85-a6ce-89c3ecddf911',
  })
  @IsUUID()
  id_company: string;

  @ApiProperty({
    description: 'ID de la categoría de la oferta',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
  @IsUUID()
  id_category: string;

  @ApiProperty({
    description: 'Cualificaciones requeridas para la oferta',
    example: 'Licenciatura en Ingeniería de Software',
  })
  @IsString()
  @Length(1, 150)
  qualif: string;

  @ApiProperty({
    description: 'Descripción de la oferta',
    example: 'Buscamos un desarrollador con experiencia en NestJS.',
  })
  @IsString()
  descr: string;

  @ApiProperty({
    description: 'Salario ofrecido (opcional)',
    example: 50000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  salary: number;

  @ApiProperty({
    description: 'Modalidad de trabajo (remoto, presencial, híbrido)',
    example: 'REMOTE',
  })
  @IsEnum(jobMode)
  mode: jobMode;

  @ApiProperty({
    description: 'Fecha de publicación de la oferta',
    example: '2025-11-18',
  })
  @IsDateString()
  publication: Date;

  @ApiProperty({
    description: 'Estado de la oferta (opcional)',
    example: 'PENDING',
    required: false,
  })
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}