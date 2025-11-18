import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateApplicantProfileDto {
  //@IsNotEmpty({ message: 'El id del usuario es obligatorio' })
  //@IsUUID('4', {
  //  message: 'El id del usuario debe tener un formato UUID',
  //})
  //userId: string;

  @IsNotEmpty({ message: 'La profesion es requerida' })
  @IsString({ message: 'La profesion debe ser una cadena de caracteres' })
  proffesion: string;

  @IsNotEmpty({ message: 'Las habilidades son requeridas' })
  @IsString({ message: 'las habilidades deben ser una cadena de caracteres' })
  skills: string;

  @IsNotEmpty({ message: 'Las años de experiencia son requeridos' })
  @IsInt({ message: 'Los años de experiencia deben ser un entero' })
  @Min(0)
  experienceYears: number;

  @IsNotEmpty({ message: 'La ubicación es requerida' })
  @IsString({ message: 'la ubicación debe ser una cadena de caracteres' })
  location: string;

  @IsNotEmpty({ message: 'La descripcion es requerida' })
  @IsString({ message: 'la descripcion debe ser una cadena de caracteres' })
  description: string;
}
