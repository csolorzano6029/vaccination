import { Controller, Get } from '@nestjs/common';
import { RoleService } from '../services';
import { RoleDto } from '../dtos';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('/roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @ApiOperation({ summary: 'Obtain all roles' })
  @ApiResponse({
    status: 200,
    description: 'La lista de roles ha sido recuperada correctamente',
    type: [RoleDto],
  })
  @Get()
  async getVaccines(): Promise<RoleDto[]> {
    return await this._roleService.getRoles();
  }
}
