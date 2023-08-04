import { ApiProperty } from '@nestjs/swagger';
export class RoleDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  lastModifiedDate: Date;

  roles: RoleDto[];
}
