import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;
}
