import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateCompanyProfileDto {
  @IsString()
  @Length(2, 100)
  companyName: string;

  @IsEmail()
  contactEmail: string;

  @IsOptional()
  @IsString()
  @Length(7, 15)
  contactPhone?: string;

  @IsOptional()
  @IsString()
  @Length(5, 200)
  address?: string;

  @IsOptional()
  @IsString()
  description?: string;
}