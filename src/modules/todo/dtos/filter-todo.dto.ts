import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { TodoStatus } from '../enums';

export class FilterTodosDto {
  @ApiPropertyOptional()
  @IsOptional()
  completed: 'ALL' | TodoStatus;

  @ApiPropertyOptional()
  @IsOptional()
  sortBy?: TodoStatus;
}
