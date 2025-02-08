import { BaseEntity } from 'src/core/entities/base.entity';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export interface IBaseRepository<T extends Partial<BaseEntity>> {
  /**
   * Create entity and return
   * @param data
   */
  create(data: DeepPartial<T>): T;

  /**
   * Save entity
   * @param data
   */
  save(data: DeepPartial<T>): Promise<T>;

  /**
   * Get all data with count
   * @param where
   * @param select
   * @param relations
   * @param sort
   * @param page
   */
  getAll(
    where?: FindManyOptions['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
  ): Promise<[T[], number]>;

  /**
   * Is entity exist by given params
   * @param where
   * @param relations
   * @returns
   */
  isExist(
    where: FindOneOptions<T>['where'],
    relations?: FindManyOptions['relations'],
  ): Promise<boolean>;

  /**
   * Get entity by id with relations
   * @param id
   * @param select
   * @param relations
   */
  getOneById(
    id: string,
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T | null>;

  /**
   * Get entity
   * @param where
   * @param select
   * @param relations
   */
  getOne(
    where: FindOneOptions['where'],
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T | null>;

  /**
   * Create and return created entity
   * @param data
   * @param relations
   */
  createAndGetEntity(data: DeepPartial<T>): Promise<T>;

  /**
   * Update and return updated entity
   * @param id
   * @param data
   * @param relations
   */
  updateAndGetEntity(
    id: string,
    data: QueryDeepPartialEntity<T>,
    relations?: FindManyOptions['relations'],
  ): Promise<T | null>;

  /**
   * Soft delete
   * @param id
   */
  softDelete(id: string): Promise<UpdateResult>;
}
