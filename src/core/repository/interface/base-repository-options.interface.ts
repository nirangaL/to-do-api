import { FindManyOptions } from 'typeorm';

export interface IRepositoryOption {
  select?: FindManyOptions['select'];
  relation?: FindManyOptions['relations'];
  sort?: FindManyOptions['order'];
}
