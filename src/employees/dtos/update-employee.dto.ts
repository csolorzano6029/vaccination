import { IsOptional, IsString } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status: string;
}

export class ResponseUpdateEmployeeDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  employee: UpdateEmployeeDto;
}
