import { IsString, IsNotEmpty, MaxLength, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
@IsNotEmpty({ message: 'La profesion es requerida' })
    @IsString({ message: 'La profesion debe ser una cadena de caracteres' })
    proffesion: string;

    @IsNotEmpty({ message: 'Las habilidades son requeridas' })
    @IsString({ message: 'las habilidades deben ser una cadena de caracteres' })
    skills: string;

    @IsNotEmpty({ message: 'Las años de experiencia son requeridos' })
    @IsInt({ message: 'Los años de experiencia deben ser un entero' })
    experienceYears: number;

    @IsNotEmpty({ message: 'La ubicación es requerida' })
    @IsString({ message: 'la ubicación debe ser una cadena de caracteres' })
    location: string;

    @IsNotEmpty({ message: 'La descripcion es requerida' })
    @IsString({ message: 'la descripcion debe ser una cadena de caracteres' })
    description: string;
}