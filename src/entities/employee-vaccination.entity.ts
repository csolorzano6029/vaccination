import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { VaccineEntity } from './vaccine.entity';

@Entity('vaccination_registry.employee_vaccination')
export class EmployeeVaccinationEntity {
  static ALIAS = 'EmployeeVaccination';

  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.employeeVaccinations)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;

  @ManyToOne(() => VaccineEntity, (vaccine) => vaccine.employeeVaccinations)
  @JoinColumn({ name: 'vaccine_id' })
  vaccine: VaccineEntity;

  @Column({ name: 'vaccination_date', type: 'date' })
  vaccinationDate: Date;

  @Column({ name: 'dose_number', type: 'integer' })
  doseNumber: number;

  @Column({ name: 'status', type: 'varchar', default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;
}
