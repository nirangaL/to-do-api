import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { TodoStatus } from '../enums';

@Entity('todos')
export class Todo extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column({ default: TodoStatus.UNCOMPLETED })
  completed: TodoStatus;

  @Column({ nullable: true })
  completedAt?: Date;

  @ManyToOne(() => User, (user) => user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
