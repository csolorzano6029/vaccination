import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRoleService } from './services';
import { UserRoleEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
