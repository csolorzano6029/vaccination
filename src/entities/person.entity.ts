import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity('vaccination_registry.person')
export class PersonEntity {
  static ALIAS = 'person';

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', nullable: false })
  lastName: string;

  @Column({ name: 'dni', type: 'numeric', unique: true, nullable: false })
  dni: number;

  @Column({ name: 'status', type: 'varchar', nullable: false, default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;

  @OneToOne(() => EmployeeEntity, (employee) => employee.person)
  employee: EmployeeEntity;
}
