// ...existing code...
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-categories.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiPropertyOptional({
    description: 'Nombre de la categoría (opcional)',
    example: 'inpersonal',
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  categ?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la categoría (opcional)',
    example: 'Categoría relacionada con cursos presenciales.',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
  descr?: string;
}