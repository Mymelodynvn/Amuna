import {
  IsUUID,
  IsString,
  IsOptional,
  MinLength,
  IsBoolean, IsNotEmpty
} from 'class-validator';

export class UpdateCredentialDto {
  @IsOptional()
  @IsUUID('4', { message: 'El id debe ser un uuidválido' })
  userId: string;

  @IsOptional()
  @IsString({ message: 'El tipo de credencial debe ser texto' })
  credentialType: string;

  @IsOptional()
  @IsString({ message: 'La identificación debe ser texto' })
  identification: string;

  @IsOptional()
  @IsString({ message: 'La contraseña debe ser texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 carácteres' })
  password: string;

  @IsNotEmpty ({ message:'Debes ingresar el token' })
  @IsString({ message: 'El token debe ser texto' })
  token: string;

  @IsOptional()
  @IsBoolean({ message: 'Verificado:  debe ser verdadero o falso' })
  isVerified: boolean;
}
