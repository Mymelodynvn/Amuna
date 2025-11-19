import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-categories.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString()
  @IsOptional()
  categ?: string;

  @IsString()
  @IsOptional()
  descr?: string;
}