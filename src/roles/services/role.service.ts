import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { RoleEntity } from '../../entities';
import { Status } from '../../constants';
import { RoleDto } from '../dtos';

/**
 * Service to Role
 * @author csolorzano
 * @version 1.0.0
 */

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private _roleRepository: Repository<RoleEntity>,
  ) {}

  async getRole(name: string): Promise<RoleEntity> {
    const alias = RoleEntity.ALIAS;
    return await this._roleRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status =:status`, { status: Status.Active })
      .andWhere(`${alias}.name =:name`, { name })
      .getOne();
  }

  async getRoles(): Promise<RoleDto[]> {
    const alias = RoleEntity.ALIAS;
    return await this._roleRepository
      .createQueryBuilder(alias)
      .where(`${alias}.status =:status`, { status: Status.Active })
      .getMany();
  }

  async createRole(role: RoleEntity): Promise<RoleEntity> {
    return await this._roleRepository.save(role);
  }
}
