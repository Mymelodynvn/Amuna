// ...existing code...
import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicantProfileDto } from './createApplicantProfile.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicantProfileDto extends PartialType(
  CreateApplicantProfileDto,
) {
  @ApiProperty({ description: 'UUID del perfil del aspirante (requerido)', example: 'uuid-del-perfil' })
  @IsNotEmpty({ message: 'El id del perfil del aspirate es obligatorio' })
  @IsUUID('4', {
    message: 'El id del perfil del aspirante debe tener un formato UUID',
  })
  uuid: string;
}
// ...existing code...