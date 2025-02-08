import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TodoStatus } from '../enums';

export class TodoUpdateDto {
  @ApiProperty()
  @IsEnum(TodoStatus, {
    message: 'Completed value must be either 0 or 1',
  })
  @IsNotEmpty({
    message: 'Completed status is required',
  })
  completed: TodoStatus;

  completedAt?: Date;
}
