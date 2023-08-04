import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { UserRoleEntity } from './user-role.entity';

@Entity('vaccination_registry.user')
export class UserEntity {
  static ALIAS = 'user';

  @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
  id: number;

  @OneToOne(() => EmployeeEntity, (employee) => employee.user)
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;

  @Column({ name: 'username', type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'status', type: 'varchar', default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.user)
  userRoles: UserRoleEntity[];
}
