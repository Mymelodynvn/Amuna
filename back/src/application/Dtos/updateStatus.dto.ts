import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApplicationStatus } from 'src/enum/application.enum';

export class UpdateStatusDto {
  @IsNotEmpty({ message: 'El estado de la postulación es requerido' })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;
}
