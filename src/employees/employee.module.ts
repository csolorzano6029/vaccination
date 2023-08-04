import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeService } from './services';
import { EmployeeEntity } from '../entities';
import { EmployeeController } from './controllers';
import { PersonModule } from '../people/person.module';
import { RoleModule } from '../roles/role.module';
import { UserModule } from '../users/user.module';
import { UserRoleModule } from '../user-roles/user-role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeEntity]),
    UserRoleModule,
    PersonModule,
    RoleModule,
    UserModule,
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
