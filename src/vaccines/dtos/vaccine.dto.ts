import { ApiProperty } from '@nestjs/swagger';

export class VaccineDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  vaccineType: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  lastModifiedDate: Date;
}
