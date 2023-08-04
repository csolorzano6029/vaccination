import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../../entities';
import { UserDto } from '../dtos';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/login')
  @ApiOperation({ summary: 'Log in' })
  @ApiQuery({
    name: 'username',
    description: 'Nombre de usuario',
    type: String,
  })
  @ApiQuery({ name: 'password', description: 'Contraseña', type: String })
  @ApiResponse({
    status: 200,
    description: 'Inició sesión correctamente',
    type: UserDto,
  })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async loginUser(
    @Query('username') username: string,
    @Query('password') password: string,
  ): Promise<UserDto> {
    return await this._userService.loginUser(username, password);
  }
}
