import { IBaseRepository } from 'src/core/repository';
import { Todo } from '../entities';
import { FilterTodosDto } from '../dtos/filter-todo.dto';
import { TodoStatus } from '../enums';

export const TodoRepositoryInterface = 'ITodoRepository';

export interface ITodoRepository extends IBaseRepository<Todo> {
  getTodos(
    userId: string,
    filter: FilterTodosDto,
    sortBy?: TodoStatus,
  ): Promise<Todo[]>;
}
