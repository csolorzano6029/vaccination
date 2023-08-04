import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeVaccinationService } from './services';
import { EmployeeVaccinationEntity } from '../entities';
import { EmployeeVaccinationController } from './controllers';
import { EmployeeModule } from 'src/employees/employee.module';
import { VaccineModule } from 'src/vaccines/vaccine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeVaccinationEntity]),
    EmployeeModule,
    VaccineModule,
  ],
  providers: [EmployeeVaccinationService],
  exports: [EmployeeVaccinationService],
  controllers: [EmployeeVaccinationController],
})
export class EmployeeVaccinationModule {}
