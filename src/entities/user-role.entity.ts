import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity('vaccination_registry.user_role')
export class UserRoleEntity {
  static ALIAS = 'userRole';

  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'status', type: 'varchar', nullable: false, default: '1' })
  status: string;

  @CreateDateColumn({ name: 'created_date', type: 'date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'last_modified_date', type: 'date' })
  lastModifiedDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.userRoles)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userRoles)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;
}
