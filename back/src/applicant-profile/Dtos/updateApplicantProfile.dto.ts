import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantProfileDto } from './createApplicantProfile.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateApplicantProfileDto extends PartialType(
  CreateApplicantProfileDto,
) {
  @IsNotEmpty({ message: 'El id del perfil del aspirate es obligatorio' })
  @IsUUID('4', {
    message: 'El id del perfil del aspirante debe tener un formato UUID',
  })
  uuid: string;
}
