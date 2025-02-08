import {
  Controller,
  Inject,
  Post,
  UseGuards,
  HttpStatus,
  HttpCode,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { Todo } from '../entities';
import {
  TodoServiceInterface,
  ITodoService,
} from '../interfaces/todo-service.interface';
import {
  TodoCreateDto as CreateTodoDto,
  TodoUpdateDto as UpdateTodoDto,
} from '../dtos';
import { LoggedUser } from 'src/modules/auth/decorators';
import { AuthUser } from 'src/modules/auth/interfaces/auth-user.interface';
import { FilterTodosDto } from '../dtos/filter-todo.dto';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(
    @Inject(`${TodoServiceInterface}`)
    private readonly todoService: ITodoService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Todo item' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Todo item successfully created',
    type: Todo,
  })
  @ApiBody({ type: CreateTodoDto })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @LoggedUser() authUser: AuthUser,
  ): Promise<Todo> {
    return await this.todoService.create(createTodoDto, authUser.email);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Todo item by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todo item found',
    type: Todo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Todo item not found',
  })
  async getById(
    @Param('id') id: string,
    @LoggedUser() authUser: AuthUser,
  ): Promise<Todo> {
    return await this.todoService.getById(id, authUser.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Todo item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Todo item successfully updated',
    type: Todo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Todo item not found',
  })
  @ApiBody({ type: UpdateTodoDto })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @LoggedUser() authUser: AuthUser,
  ): Promise<Todo> {
    return await this.todoService.update(id, authUser.id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo item' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Todo item successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Todo item not found',
  })
  async delete(
    @Param('id') id: string,
    @LoggedUser() authUser: AuthUser,
  ): Promise<void> {
    await this.todoService.delete(id, authUser.id);
  }

  @Get()
  @ApiOperation({ summary: 'Filter Todos' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get All Todos',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Todos not found',
  })
  @ApiQuery(FilterTodosDto)
  async findAllClient(
    @LoggedUser() authUser: AuthUser,
    @Query() filter: FilterTodosDto,
  ): Promise<Todo[]> {
    return this.todoService.getAll(authUser.id, filter);
  }
}
