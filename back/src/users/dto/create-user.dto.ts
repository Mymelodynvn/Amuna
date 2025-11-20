import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Matches,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Roles } from 'src/enum/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser texto' })
  @Matches(/^[a-zA-Z ]+$/, { message: 'El nombre solo puede tener letras y espacios' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 letras' })
  @MaxLength(25, { message: 'El nombre no puede tener más de 25 letras' })
  firstName: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  @IsString({ message: 'El apellido debe ser texto' })
  @Matches(/^[a-zA-Z ]+$/, { message: 'El apellido solo puede tener letras y espacios' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 letras' })
  @MaxLength(25, { message: 'El apellido no puede tener más de 25 letras' })
  lastName: string;

  @IsEmail({}, { message: 'El correo no tiene formato válido' })
  email: string;

  @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
    message: 'La fecha de cumpleaños debe estar en formato dd/mm/aaaa',
  })
  birthDate: string;

  @IsOptional()
  @IsString({ message: 'El teléfono debe ser texto' })
  @Matches(/^[0-9+ ]+$/, { message: 'El teléfono solo puede tener números, espacios o +' })
  phone: string;

  @IsNotEmpty({message: 'El usuario debe tener un estado'})
  @IsBoolean({ message: 'isActive debe ser verdadero o falso' })
  isActive: boolean;

  @IsOptional()
  role: Roles;
}
