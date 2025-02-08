import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities';

import { TodoService } from './services/todo.service';
import { TodoRepositoryInterface, TodoServiceInterface } from './interfaces';
import { TodoRepository } from './repositories/todo.repository';
import { TodoController } from './controllers/todo.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), UserModule],
  controllers: [TodoController],
  providers: [
    {
      provide: `${TodoServiceInterface}`,
      useClass: TodoService,
    },
    {
      provide: `${TodoRepositoryInterface}`,
      useClass: TodoRepository,
    },
  ],
})
export class TodoModule {}
