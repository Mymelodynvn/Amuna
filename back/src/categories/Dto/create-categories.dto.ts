import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  categ: string;

  @IsString()
  @IsOptional()
  descr?: string;
}