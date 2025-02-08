import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';
import { Exclude } from 'class-transformer';
import { Todo } from 'src/modules/todo/entities/todo.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
