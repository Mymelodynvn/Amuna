// ...existing code...
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'inpersonal',
  })
  @IsNotEmpty({ message: 'El nombre de la categoría es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de caracteres.' })
  categ: string;

  @ApiProperty({
    description: 'Descripción de la categoría (opcional)',
    example: 'Categoría relacionada con cursos presenciales.',
    required: false,
  })
  @IsString({ message: 'La descripción debe ser una cadena de caracteres.' })
  descr?: string;
}