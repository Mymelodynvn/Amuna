import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEntrepreneurProfileDto {
  @ApiProperty({
    description: 'Nombre del negocio',
    example: 'Mi Empresa S.A.',
  })
  @IsNotEmpty({ message: 'El nombre del negocio es requerido' })
  @IsString({ message: 'El nombre del negocio debe ser una cadena' })
  @MaxLength(150)
  businessName: string;

  @ApiProperty({
    description: 'Descripción del negocio',
    example: 'Empresa dedicada al desarrollo de software.',
  })
  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser una cadena' })
  description: string;

  @ApiProperty({
    description: 'Página web del negocio (opcional)',
    example: 'https://miempresa.com',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La página web debe ser una cadena' })
  @MaxLength(150)
  website: string;
}
