import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
  SaveOptions,
} from 'typeorm';
import { ICrudReadService } from '../../interfaces/crud-interface/services/ICrudReadService.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ICrudWriteService } from '../../interfaces/crud-interface/services/ICrudWriteService.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { ReduceArrayByKeysWith_In } from '../../../common/helpers/reduce-array-by-keys';

@Injectable()
export abstract class CrudReadWriteService<TEntity> implements ICrudReadService<TEntity>, ICrudWriteService<TEntity> {

  protected constructor(
    private readonly _repository: Repository<TEntity>,
  ) {
  }

  /**
   * Finds entities that match given options or conditions.
   * @param options
   */
  async _find(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<[TEntity[], number]> {
    options = { ...options, withDeleted: false };
    return await this._repository.findAndCount(options);
  };

  /**
   * Finds entities deleted that match given options or conditions.
   * @param options
   */
  async _findSoft(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<[TEntity[], number]> {
    options = { ...{ withDeleted: true } };
    return await this._repository.findAndCount(options);
  };

  /**
   * Finds entities + deleted that match given options or conditions.
   * @param options
   */
  async _findAndSoft(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<[TEntity[], number]> {
    options = { ...{ withDeleted: true } };
    return await this._repository.findAndCount(options);
  };

  /**
   * Find entity by id and that matches given options.
   * @param ids
   * @param options
   */
  async _findById(ids?: string | number | Date | ObjectID, options?: FindOneOptions<TEntity>): Promise<TEntity> {
    return await this._repository.findOne(ids, options);
  };

  /**
   * Finds first entity that matches given options or conditions.
   * @param options
   * @param conditions
   */
  async _findOne(conditions?: FindConditions<TEntity>, options?: FindOneOptions<TEntity>): Promise<TEntity | undefined> {
    return await this._repository.findOne(conditions, options);
  };

  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   * @param entities
   * @param options
   */
  async _upsert(entities: any, options?: SaveOptions): Promise<[(TEntity | TEntity[]), number]> {
    const _entities = this._repository.create(entities);
    const data = await this._repository.save(_entities, options);
    return [data, data.length];
  };

  /**
   * Inserts a given entity into the database.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient INSERT query.
   * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
   * @param entity
   */
  async _insert(entity: any): Promise<[(TEntity | TEntity[]), number]> {
    const data = await this._repository.insert(entity);
    const conditions = await ReduceArrayByKeysWith_In(data.identifiers);
    const result = data.identifiers.length > 1 ? await this._repository.find(conditions) : await this._repository.findOneOrFail(conditions);
    return [result, data.identifiers.length];
  };

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient UPDATE query.
   * Does not check if entity exist in the database.
   * @param conditions
   * @param partialEntity
   */
  async _update(conditions: any, partialEntity: QueryDeepPartialEntity<TEntity>): Promise<[(TEntity | TEntity[]), number]> {
    const data = await this._repository.update(conditions, partialEntity);
    return [null, data.affected];
  };

  /**
   * Deletes entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient DELETE query.
   * Does not check if entity exist in the database.
   * @param conditions
   */
  async _delete(conditions: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<TEntity>): Promise<number> {
    const deleteResult = await this._repository.delete(conditions);
    return deleteResult.affected;
  };

  /**
   * Records the delete date of entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param conditions
   */
  async _softDelete(conditions: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<TEntity>): Promise<number> {
    await this._repository.softDelete(conditions);
    return await this._repository.count(conditions as any);
  };

  /**
   * Restores entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param conditions
   */
  async _restore(conditions: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<TEntity>): Promise<[(TEntity | TEntity[]), number]> {
    const updateResult = await this._repository.restore(conditions);
    return await this._repository.findAndCount(updateResult.raw);
  };

  /**
   * Clears all the data from the given table/collection (truncates/drops it).
   * @param entities
   * @param options
   */
  async _clear(): Promise<number> {
    const count = await this._repository.count();
    await this._repository.clear();
    return count;
  };

}
