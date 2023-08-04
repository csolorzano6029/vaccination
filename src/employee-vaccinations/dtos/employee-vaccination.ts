import { IsNumber, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeVaccinationDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  employeeId: number;

  @ApiProperty()
  @IsNumber()
  personId: number;

  @ApiProperty()
  @IsString()
  vaccine: string;

  @ApiProperty()
  @IsNumber()
  doseNumber: number;

  @ApiProperty()
  @IsDate()
  vaccinationDate: Date;

  @ApiProperty()
  @IsString()
  completeName: string;
}
