// ...existing code...
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';

export class CreateCourseDto {
@ApiProperty({
    description: 'Título del curso. Texto no vacío, máximo 150 caracteres.',
    example: 'Introducción a NestJS',
    maxLength: 150,
  })
   @IsString({ message: 'El título debe ser un texto válido.' })
   @IsNotEmpty({ message: 'El título no puede estar vacío.' })
   @MaxLength(150, { message: 'El título no puede superar los 150 caracteres.' })
   title: string;

  @ApiProperty({
    description: 'Descripción del curso',
    example: 'Curso básico para aprender NestJS desde cero.',
  })
   @IsString({ message: 'La descripción debe ser un texto válido.' })
   @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
   description: string;

  @ApiProperty({
    description: 'Duración total del curso en horas (entero positivo).',
    example: 40,
  })
   @IsInt({ message: 'La duración debe ser un número entero.' })
   @Min(1, { message: 'La duración debe ser al menos 1 hora.' })
   duration: number;
}