import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty({ message: 'El id de la oferta es requerido' })
  @IsUUID('4', {
    message: 'El id de la oferta debe tener un formato UUID',
  })
  offerId: string;

  @IsNotEmpty({ message: 'El id del aspirante es requerido' })
  @IsUUID('4', {
    message: 'El id del aspirante debe tener un formato UUID',
  })
  applicantId: string;
}
