// role.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRoleEntity } from './user-role.entity';

@Entity('vaccination_registry.role')
export class RoleEntity {
  static ALIAS = 'role';

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', nullable: false, unique: true })
  name: string;

  @Column({ name: 'status', type: 'varchar', nullable: false, default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;

  @OneToMany(() => UserRoleEntity, (userRole) => userRole.role)
  userRoles: UserRoleEntity[];
}
