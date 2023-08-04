import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeVaccinationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  vaccineId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  vaccinationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  doseNumber: number;
}
