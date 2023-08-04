import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRoleEntity } from '../../entities';
import { Status } from '../../constants';

/**
 * Service to UserRole
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private _userRoleRepository: Repository<UserRoleEntity>,
  ) {}

  async createUserRole(userRole: UserRoleEntity): Promise<UserRoleEntity> {
    return await this._userRoleRepository.save(userRole);
  }

  async updateUserRole(
    userRoleId: number,
    userRole: UserRoleEntity,
  ): Promise<UpdateResult> {
    return await this._userRoleRepository.update(userRoleId, userRole);
  }
}
