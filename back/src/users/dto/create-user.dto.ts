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
