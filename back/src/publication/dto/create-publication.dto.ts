import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsUUID, IsNotEmpty } from 'class-validator';

export class CreatePublicationDto {
  @ApiProperty({
    description: 'Nombre de la publicación',
    example: 'Cómo iniciar tu primera startup',
  })
  @IsString()
  @Length(3, 150)
  title: string;

  @ApiProperty({
    description: 'Contenido de la publicación',
    example: 'Aquí te explico los pasos principales para iniciar tu startup...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({
    description: 'Categoría o tipo de publicación',
    example: 'Emprendimiento',
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  category?: string;

  // userId lo asignamos desde req.user en el controller, pero lo dejamos opcional/documentado por si acaso
  @ApiPropertyOptional({
    description: 'ID del creador (opcional, asignado desde token en el controller)',
    example: 'f3b8b6dd-12f0-4f85-a6ce-89c3ecddf911',
    required: false,
  })
  @IsOptional()
  @IsUUID('4')
  userId?: string;
}