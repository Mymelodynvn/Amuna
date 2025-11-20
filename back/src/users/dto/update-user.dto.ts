import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsString,
  IsOptional,
  Matches,
  IsEmail,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { Roles } from 'src/enum/roles.enum';

export class UpdateUserDto {
    @ApiProperty({
    description: 'UUID del usuario a actualizar',
    example: '550e8400-e29b-41d4-a716-446655440000',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  userId: string;

  @IsOptional()
  @IsString({ message: 'El nombre debe ser texto' })
  @Matches(/^[a-zA-Z ]+$/, { message: 'El nombre solo puede tener letras y espacios' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 letras' })
  @MaxLength(25, { message: 'El nombre no puede tener más de 25 letras' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'El apellido debe ser texto' })
  @Matches(/^[a-zA-Z ]+$/, { message: 'El apellido solo puede tener letras y espacios' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 letras' })
  @MaxLength(25, { message: 'El apellido no puede tener más de 25 letras' })
  lastName: string;

  @IsOptional()
  @IsEmail({}, { message: 'El correo no tiene formato válido' })
  email: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @Matches(/^[0-9+ ]+$/, { message: 'El teléfono solo puede tener números, espacios o +' })
  phone: string;

  @IsOptional()
  @IsBoolean({ message: 'Usuario debe estar activo o inactivo' })
  isActive: boolean;

  @IsOptional()
  role: Roles;
}
