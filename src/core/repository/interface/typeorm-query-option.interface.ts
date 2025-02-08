import { FindManyOptions } from 'typeorm';

// Interface for common query options
export interface ITypeOrmOption<Model> extends FindManyOptions<Model> {
  sort?: FindManyOptions['order'];
  relation?: FindManyOptions['relations'];
}
