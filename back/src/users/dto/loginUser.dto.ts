import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @ApiProperty({
      description: 'Nombre del usuario',
      example: 'Juan',
    })
  @IsString()
  @IsNotEmpty({ message: 'El userName es requerido' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'La password es requerida' })
  password: string;
}
