// ...existing code...
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({
    description: 'ID de la oferta a la que aplica el aspirante',
    example: 'f3b8b6dd-12f0-4f85-a6ce-89c3ecddf911',
  })
   @IsNotEmpty({ message: 'El id de la oferta es requerido' })
   @IsUUID('4', {
     message: 'El id de la oferta debe tener un formato UUID',
   })
   offerId: string;

  @ApiProperty({
    description: 'UUID del perfil del aspirante que realiza la postulación',
    example: 'a9c4321e-9364-4c16-8a5e-bdb38c6b9123',
  })
   @IsNotEmpty({ message: 'El id del aspirante es requerido' })
   @IsUUID('4', {
     message: 'El id del aspirante debe tener un formato UUID',
   })
   applicantId: string;
 }
 // ...existing code...