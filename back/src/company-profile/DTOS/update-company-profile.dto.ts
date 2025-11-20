import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyProfileDto } from './create-company-profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCompanyProfileDto extends PartialType(CreateCompanyProfileDto) {

  @ApiProperty({
    description: 'Nombre de la empresa (opcional)',
    example: 'Amuna S.A.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre de la empresa debe ser una cadena de texto' })
  @Length(2, 100, { message: 'El nombre debe tener entre 2 y 100 caracteres' })
  companyName?: string;

  @ApiProperty({
    description: 'Correo de contacto de la empresa (opcional)',
    example: 'contacto@amuna.com',
    required: true,
  })
  @IsOptional()
  @IsEmail({}, { message: 'El correo proporcionado no es válido' })
  contactEmail?: string;

  @ApiProperty({
    description: 'Teléfono de contacto (opcional)',
    example: '+57 3001234567',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser una cadena de texto' })
  @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 caracteres' })
  contactPhone?: string;

  @ApiProperty({
    description: 'Dirección de la empresa (opcional)',
    example: 'Cra 10 # 25-30, Bogotá',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  @Length(5, 200, { message: 'La dirección debe tener entre 5 y 200 caracteres' })
  address?: string;

  @ApiProperty({
    description: 'Descripción de la empresa (opcional)',
    example: 'Empresa dedicada al desarrollo de software.',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description?: string;
}