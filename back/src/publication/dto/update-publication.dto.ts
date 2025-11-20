import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  @ApiPropertyOptional({ description: 'Título (opcional)', example: 'Título actualizado' })
  @IsOptional()
  @IsString()
  @Length(3, 150)
  title?: string;

  @ApiPropertyOptional({ description: 'Contenido (opcional)' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ description: 'Categoría (opcional)', example: 'Emprendimiento' })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  category?: string;
}