import {
  DeepPartial,
  DeleteResult,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IBaseRepository } from './interface';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<T extends Partial<BaseEntity>>
  implements IBaseRepository<T>
{
  private _manager?: EntityManager;
  private entity: Repository<T>;
  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  set manager(manager: EntityManager) {
    this._manager = manager;
  }

  get manager(): EntityManager {
    if (this._manager) {
      return this._manager;
    }
    return this.entity.manager;
  }

  unsetManager(): void {
    this._manager = undefined;
  }

  get repository(): Repository<T> {
    return this.manager.getRepository(this.entity.target);
  }

  async transaction<E = T>(
    operation: (entityManager: EntityManager) => Promise<E>,
  ): Promise<E> {
    return this.entity.manager.transaction(operation);
  }

  fieldToWhereClause(
    field: string,
    search: FindOperator<string | number>,
  ): FindManyOptions['where'] {
    if (field?.match(/\./)) {
      const fieldPaths = field.split(/\.(.*)/);
      return {
        [fieldPaths[0]]: this.fieldToWhereClause(fieldPaths[1], search),
      };
    } else {
      return { [field]: search };
    }
  }

  /**
   * Get all data with count
   * @param where
   * @param select
   * @param relations
   * @param sort
   * @param page
   * @returns
   */
  async getAll(
    where?: FindManyOptions<T>['where'],
    select?: FindManyOptions['select'],
    relations?: FindManyOptions['relations'],
    sort?: FindManyOptions['order'],
  ): Promise<[T[], number]> {
    const options: Record<string, unknown> = {};
    if (select) {
      options['select'] = select;
    }
    if (where) {
      options['where'] = where;
    }
    if (relations) {
      options['relations'] = relations;
    }
    if (sort) {
      options['order'] = sort;
    }

    return await this.repository.findAndCount(options);
  } // getAll

  /**
   * Get entity by id with relations
   * @param id
   * @param select
   * @param relations
   * @returns
   */
  async getOneById(
    id: string,
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T | null> {
    const options: Record<string, unknown> = {};
    options['where'] = { id };
    if (select) {
      options['select'] = select;
    }
    if (relations) {
      options['relations'] = relations;
    }
    return await this.repository.findOne(options);
  }

  /**
   * Is entity exist by given params
   * @param where
   * @param relations
   * @returns
   */
  async isExist(
    where: FindOneOptions<T>['where'],
    relations?: FindManyOptions['relations'],
  ): Promise<boolean> {
    const options: Record<string, unknown> = { where };

    if (relations) {
      options['relations'] = relations;
    }
    return Boolean(await this.repository.findOne(options));
  } // getOne

  /**
   * Get entity
   * @param where
   * @param select
   * @param relations
   * @returns
   */
  async getOne(
    where: FindOneOptions<T>['where'],
    select?: FindOneOptions['select'],
    relations?: FindManyOptions['relations'],
  ): Promise<T | null> {
    const options: Record<string, unknown> = { where };
    if (select) {
      options['select'] = select;
    }
    if (relations) {
      options['relations'] = relations;
    }
    return await this.repository.findOne(options);
  } // getOne

  /**
   * Create and return created entity
   * @param data
   * @param relations
   * @returns
   */
  async createAndGetEntity(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  } // createAndGetEntity

  async update(
    id: string,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return this.repository.update(id, data);
  } // update

  /**
   * Update and return updated entity
   * @param id
   * @param data
   * @param relations
   * @returns
   */
  async updateAndGetEntity(
    id: string,
    data: QueryDeepPartialEntity<T>,
    relations?: FindManyOptions['relations'],
  ): Promise<T | null> {
    await this.repository.update(id, data);
    return await this.getOneById(id, relations);
  } // updateAndGetEntity

  async updateAll(
    criteria: number | number[],
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.repository.update(criteria, partialEntity);
  } // updateAll

  /**
   * Delete entity
   * @param id
   * @returns
   */
  async remove(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  } // remove

  /**
   * Soft delete
   * @param id
   * @returns
   */
  async softDelete(id: string): Promise<UpdateResult> {
    return await this.repository.softDelete(id);
  }
}
