import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/core/repository';
import { FindManyOptions, Repository } from 'typeorm';
import { Todo } from '../entities';
import { ITodoRepository } from '../interfaces/todo-repository.interface';
import { TodoStatus } from '../enums';
import { FilterTodosDto } from '../dtos/filter-todo.dto';

@Injectable()
export class TodoRepository
  extends BaseRepository<Todo>
  implements ITodoRepository
{
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {
    super(todoRepo);
  }

  async getTodos(userId: string, filter: FilterTodosDto): Promise<Todo[]> {
    const where: FindManyOptions<Todo>['where'] = {
      user: { id: userId },
    };
    let sort: FindManyOptions<Todo>['order'] = {};
    if (filter.completed != 'ALL') {
      where.completed = filter.completed;

      // Apply sorting conditions

      if (filter.completed === TodoStatus.UNCOMPLETED) {
        sort = { createdAt: 'DESC' };
      } else {
        sort = { completedAt: 'ASC' };
      }
    }

    const [data] = await this.getAll(where, undefined, undefined, sort);
    return data;
  }
}
