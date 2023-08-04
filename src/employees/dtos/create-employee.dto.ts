import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  @Matches(/^[0-9]*$/, { message: 'Cédula debe contener solo números' })
  dni: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/, {
    message: 'Nombres solo pueden contener letras y espacios',
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/, {
    message: 'Apellidos solo pueden contener letras y espacios',
  })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  homeAddress: string;

  @ApiProperty()
  @IsOptional()
  mobilePhone: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  vaccinationStatus: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;
}
