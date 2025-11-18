import {
  IsUUID,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateCredentialDto {
  @IsUUID('4', { message: 'El campo id de user debe ser un uuid válido' })
  userId: string;

  @IsString({ message: 'El nombre de usuario debe ser texto' })
  @IsNotEmpty({ message: 'El userName es obligatorio' })
  userName: string;

  @IsString({ message: 'El tipo de credencial debe ser texto' })
  @IsNotEmpty({ message: 'El tipo de credencial es obligatorio' })
  credentialType: string;

  @IsString({ message: 'La identificación debe ser texto' })
  @IsNotEmpty({ message: 'La identificación es obligatoria' })
  identification: string;

  @IsString({ message: 'La contraseña debe ser texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNotEmpty()
  @IsString({ message: 'El token debe ser texto' })
  token: string;

  @IsOptional()
  @IsBoolean({ message: 'Verificado:  debe ser verdadero o falso' })
  isVerified: boolean;
}
