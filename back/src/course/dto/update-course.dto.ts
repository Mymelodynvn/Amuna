// ...existing code...
import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiPropertyOptional({
    description: 'Título del curso (opcional)',
    example: 'Curso avanzado de NestJS',
    maxLength: 150,
  })
  @IsOptional()
  @IsString({ message: 'El título debe ser un texto válido.' })
  @MaxLength(150, { message: 'El título no puede superar los 150 caracteres.' })
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción del curso (opcional)',
    example: 'Actualización del contenido del curso.',
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser un texto válido.' })
  description?: string;

  @ApiPropertyOptional({
    description: 'Duración del curso en horas (opcional)',
    example: 50,
  })
  @IsOptional()
  @IsInt({ message: 'La duración debe ser un número entero.' })
  @Min(1, { message: 'La duración debe ser al menos 1 hora.' })
  duration?: number;
}