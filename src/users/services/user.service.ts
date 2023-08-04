import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../entities';
import { Status } from '../../constants';
import { UserException } from '../../errors/user.error';
import { UserDto } from '../dtos';

/**
 * Service to User
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private _userRepository: Repository<UserEntity>,
  ) {}

  async getUser(username: string): Promise<UserEntity> {
    const alias = UserEntity.ALIAS;
    return await this._userRepository
      .createQueryBuilder(alias)
      .leftJoinAndSelect(`${alias}.userRoles`, 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where(`${alias}.status = '${Status.Active}'`)
      .andWhere(`${alias}.username =:username`, { username })
      .getOne();
  }

  async validatePassword(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(providedPassword, storedPassword);
  }

  async loginUser(
    username: string,
    providedPassword: string,
  ): Promise<UserDto> {
    const responseUser = new UserDto();
    const user = await this.getUser(username);

    if (!user) throw new UserException('user-valid', HttpStatus.BAD_REQUEST);

    const isValid = await this.validatePassword(
      providedPassword,
      user?.password,
    );

    if (!isValid) throw new UserException('credential', HttpStatus.BAD_REQUEST);

    responseUser.id = user.id;
    responseUser.username = user.username;
    responseUser.password = user.password;
    responseUser.status = user.status;
    responseUser.createdDate = user.createdDate;
    responseUser.lastModifiedDate = user.lastModifiedDate;
    responseUser.roles = user.userRoles.map((userRole) => {
      return { id: userRole.role?.id, name: userRole.role?.name };
    });

    return responseUser;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    return await this._userRepository.save(user);
  }

  async updateuser(userId: number, user: UserEntity): Promise<UpdateResult> {
    return await this._userRepository.update(userId, user);
  }
}
