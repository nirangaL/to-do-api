import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TodoStatus } from '../enums';

export class TodoCreateDto {
  @ApiProperty()
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ default: TodoStatus.UNCOMPLETED })
  @IsBoolean({ message: 'Completed must be a boolean value' })
  @IsOptional()
  completed?: TodoStatus;
}
