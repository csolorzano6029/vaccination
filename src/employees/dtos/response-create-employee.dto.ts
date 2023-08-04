import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';

export class ResponseCreateEmployeeDto {
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

  @ApiProperty({ type: Date })
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
  status: 'Active' | 'Inactive';

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  role: string;
}
