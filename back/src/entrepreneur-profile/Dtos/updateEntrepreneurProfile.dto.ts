import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateEntrepreneurProfileDto {
  @ApiProperty({
    description: 'UUID del perfil de emprendedor',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @ApiProperty({
    description: 'Nombre del negocio (opcional)',
    example: 'Mi Empresa Actualizada S.A.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  businessName: string;

  @ApiProperty({
    description: 'Descripción del negocio (opcional)',
    example: 'Empresa dedicada al desarrollo de software y consultoría.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Página web del negocio (opcional)',
    example: 'https://miempresaactualizada.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  website: string;
}
