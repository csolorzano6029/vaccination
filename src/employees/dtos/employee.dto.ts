import {
  IsNumber,
  IsString,
  IsDateString,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class RoleDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;
}

class VaccineDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  doseNumber: number;

  @ApiProperty()
  @IsDateString()
  vaccinationDate: Date;

  @ApiProperty()
  @IsNumber()
  employeeVaccinationId: number;
}

export class EmployeeDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  dni: number;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  homeAddress: string;

  @ApiProperty()
  @IsString()
  mobilePhone: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsBoolean()
  vaccinationStatus: boolean;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => VaccineDto)
  vaccines: VaccineDto[];

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  roles: RoleDto[];
}
