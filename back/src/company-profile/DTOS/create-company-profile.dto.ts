import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyProfileDto {
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Amuna S.A.',
  })
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  companyName: string;

  @ApiProperty({
    description: 'Correo de contacto de la empresa',
    example: 'contacto@amuna.com',
  })
  @IsEmail({}, { message: 'El correo proporcionado no es válido' })
  contactEmail: string;

  @ApiProperty({
    description: 'Teléfono de contacto de la empresa',
    example: '+57 3001234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres' })
  contactPhone?: string;

  @ApiProperty({
    description: 'Dirección de la empresa',
    example: 'Cra 10 # 25-30, Bogotá',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres' })
  address?: string;

  @ApiProperty({
    description: 'Descripción de la empresa',
    example: 'Empresa dedicada al desarrollo de software y soluciones tecnológicas.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description?: string;
}