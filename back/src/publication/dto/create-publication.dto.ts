import { IsOptional, IsString, Length } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @Length(3, 150)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  category?: string;
}