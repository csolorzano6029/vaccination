import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeVaccinationEntity } from './employee-vaccination.entity';

@Entity('vaccination_registry.vaccine')
export class VaccineEntity {
  static ALIAS = 'vaccine';

  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'vaccine_type', type: 'varchar' })
  vaccineType: string;

  @Column({ name: 'status', type: 'varchar', default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;

  @OneToMany(
    () => EmployeeVaccinationEntity,
    (employeeVaccination) => employeeVaccination.vaccine,
  )
  employeeVaccinations: EmployeeVaccinationEntity[];
}
