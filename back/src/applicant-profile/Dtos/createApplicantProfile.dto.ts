// ...existing code...
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicantProfileDto {
  // Si tienes userId gestionado desde token, lo dejas fuera; si se necesita enviarlo: descomentar
  // @ApiProperty({ description: 'UUID del usuario propietario del perfil', example: 'uuid-usuario' })
  // @IsUUID('4', { message: 'El id del usuario debe tener un formato UUID' })
  // userId: string;

  @ApiProperty({ description: 'Profesión del aspirante', example: 'Desarrollador Fullstack' })
  @IsNotEmpty({ message: 'La profesion es requerida' })
  @IsString({ message: 'La profesion debe ser una cadena de caracteres' })
  proffesion: string;

  @ApiProperty({ description: 'Habilidades del aspirante', example: 'Node.js, TypeScript, SQL' })
  @IsNotEmpty({ message: 'Las habilidades son requeridas' })
  @IsString({ message: 'las habilidades deben ser una cadena de caracteres' })
  skills: string;

  @ApiProperty({ description: 'Años de experiencia', example: 2 })
  @IsNotEmpty({ message: 'Las años de experiencia son requeridos' })
  @IsInt({ message: 'Los años de experiencia deben ser un entero' })
  @Min(0)
  experienceYears: number;

  @ApiProperty({ description: 'Ubicación del aspirante', example: 'Bogotá, Colombia' })
  @IsNotEmpty({ message: 'La ubicación es requerida' })
  @IsString({ message: 'la ubicación debe ser una cadena de caracteres' })
  location: string;

  @ApiProperty({ description: 'Descripción o resumen profesional', example: 'Desarrollador con experiencia en APIs y microservicios' })
  @IsNotEmpty({ message: 'La descripcion es requerida' })
  @IsString({ message: 'la descripcion debe ser una cadena de caracteres' })
  description: string;
}
// ...existing code...