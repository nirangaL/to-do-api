import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TodoCreateDto, TodoUpdateDto } from '../dtos';
import { Todo } from '../entities';
import {
  ITodoService,
  TodoRepositoryInterface,
  ITodoRepository,
} from '../interfaces';
import {
  IUserService,
  UserServiceInterface,
} from 'src/modules/user/interfaces/user-service.interface';
import { FilterTodosDto } from '../dtos/filter-todo.dto';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @Inject(`${TodoRepositoryInterface}`)
    private readonly todoRepo: ITodoRepository,
    @Inject(`${UserServiceInterface}`)
    private readonly userService: IUserService,
  ) {}

  async create(createDto: TodoCreateDto, email: string): Promise<Todo> {
    try {
      const user = await this.userService.getUsrByEmail(email);
      if (!user) {
        return Promise.reject(new NotFoundException(`User is not found`));
      }
      const todo = this.todoRepo.create({ ...createDto, user });
      return await this.todoRepo.save(todo);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    userId: string,
    updateDto: TodoUpdateDto,
  ): Promise<Todo> {
    try {
      const todo = await this.todoRepo.getOne({ id, user: { id: userId } });
      if (!todo) {
        return Promise.reject(new NotFoundException(`Todo not found`));
      }

      if (updateDto.completed) {
        updateDto.completedAt = new Date();
      }

      const newTodo = await this.todoRepo.updateAndGetEntity(id, updateDto);

      if (!newTodo) {
        return Promise.reject(new NotFoundException(`Todo not found`));
      }

      return newTodo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string, userId: string): Promise<boolean> {
    try {
      const todo = await this.todoRepo.getOne({ id, user_id: userId });

      if (!todo) {
        return Promise.reject(new NotFoundException(`Todo not found`));
      }

      const result = await this.todoRepo.softDelete(id);

      return Boolean(result.affected);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getById(id: string, userId: string): Promise<Todo> {
    try {
      const todo = await this.todoRepo.getOne({ id, user_id: userId });

      if (!todo) {
        return Promise.reject(new NotFoundException(`Todo not found`));
      }
      return todo;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getAll(userId: string, filters: FilterTodosDto): Promise<Todo[]> {
    try {
      return await this.todoRepo.getTodos(userId, filters, filters.sortBy);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
