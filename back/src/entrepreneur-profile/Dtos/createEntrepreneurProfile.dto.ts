import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEntrepreneurProfileDto {
    @IsNotEmpty({ message: 'El nombre del negocio es requerido' })
    @IsString({ message: 'El nombre del negocio debe ser una cadena' })
    @MaxLength(150)
    businessName: string;

    @IsNotEmpty({ message: 'La descripción es requerida' })
    @IsString({ message: 'La descripción debe ser una cadena' })
    description: string;

    @IsOptional()
    @IsString({ message: 'La página web debe ser una cadena' })
    @MaxLength(150)
    website?: string;
}
