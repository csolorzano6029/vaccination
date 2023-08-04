import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterEmployeeDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  dni: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  completeName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  vaccine: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  finishDate: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isVaccinated: boolean;
}
