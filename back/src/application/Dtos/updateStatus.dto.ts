// ...existing code...
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from 'src/enum/application.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Nuevo estado de la postulación',
    enum: ApplicationStatus,
    example: ApplicationStatus.PENDING,
  })
   @IsNotEmpty({ message: 'El estado de la postulación es requerido' })
   @IsEnum(ApplicationStatus)
   status: ApplicationStatus;
 }
 // ...existing code...