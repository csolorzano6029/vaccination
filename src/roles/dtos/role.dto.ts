import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  createdDate: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  lastModifiedDate: Date;
}
