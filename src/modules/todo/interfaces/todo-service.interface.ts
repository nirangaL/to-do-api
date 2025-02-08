import { TodoCreateDto, TodoUpdateDto } from '../dtos';
import { FilterTodosDto } from '../dtos/filter-todo.dto';
import { Todo } from '../entities';

export const TodoServiceInterface = 'ITodoService';
export interface ITodoService {
  create(createDto: TodoCreateDto, userId: string): Promise<Todo>;
  update(id: string, userId: string, updateDto: TodoUpdateDto): Promise<Todo>;
  delete(id: string, userId: string): Promise<boolean>;
  getById(id: string, userId: string): Promise<Todo>;
  getAll(userId: string, filters: FilterTodosDto): Promise<Todo[]>;
}
