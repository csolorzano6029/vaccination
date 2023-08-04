import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { UserEntity } from './user.entity';
import { EmployeeVaccinationEntity } from './employee-vaccination.entity';

@Entity('vaccination_registry.employee')
export class EmployeeEntity {
  static ALIAS = 'employee';

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => PersonEntity, (person) => person.employee)
  @JoinColumn({ name: 'person_id' })
  person: PersonEntity;

  @Column({ name: 'email', type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  birthDate: Date;

  @Column({ name: 'home_address', type: 'varchar', nullable: true })
  homeAddress: string;

  @Column({ name: 'mobile_phone', type: 'varchar', nullable: true })
  mobilePhone: string;

  @Column({ name: 'vaccination_status', type: 'boolean', nullable: true })
  vaccinationStatus: boolean;

  @Column({ name: 'status', type: 'varchar', nullable: false, default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;

  @OneToOne(() => UserEntity, (user) => user.employee)
  user: UserEntity;

  @OneToMany(
    () => EmployeeVaccinationEntity,
    (employeeVaccination) => employeeVaccination.employee,
  )
  employeeVaccinations: EmployeeVaccinationEntity[];
}
