import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({ message: 'El userName es requerido' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'La password es requerida' })
  password: string;
}
