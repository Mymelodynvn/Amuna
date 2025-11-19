import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateEntrepreneurProfileDto {
    @IsNotEmpty()
    @IsUUID()
    uuid: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    businessName?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(150)
    website?: string;
}
