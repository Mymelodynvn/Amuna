import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class CreateUserCourseDto {
  @ApiProperty({
    description: 'UUID del usuario que se inscribe',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El userId es obligatorio' })
  userId: string;

  @ApiProperty({
    description: 'UUID del curso al que se inscribe el usuario',
    example: 'b7c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
  @IsUUID('4', { message: 'El courseId debe ser un UUID válido' })
  @IsNotEmpty({ message: 'El courseId es obligatorio' })
  courseId: string;
}