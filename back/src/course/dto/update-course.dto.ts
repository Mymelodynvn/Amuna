import { IsString, IsOptional, MaxLength, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCourseDto {
    @IsOptional()
    @IsString()
    @MaxLength(150)
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    duration?: number;
}