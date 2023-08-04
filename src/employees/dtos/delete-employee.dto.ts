import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class DeleteEmployeeDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  employeeName: string;

  @ApiProperty()
  @IsNumber()
  dni: number;

  @ApiProperty()
  @IsString()
  email: string;
}
