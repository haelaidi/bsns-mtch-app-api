import { DeepPartial, SaveOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm/find-options/FindConditions';

/**
 * * Interface service of the simple method write of respository#entity.
 */
export interface ICrudWriteService<TEntity> {

  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   * @param entities
   * @param options
   */
  _upsert(entities: DeepPartial<TEntity>[], options?: SaveOptions): Promise<[(TEntity | TEntity[]), number]>;

  /**
   * Inserts a given entity into the database.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient INSERT query.
   * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
   * @param entity
   */
  _insert(entity: QueryDeepPartialEntity<TEntity> | QueryDeepPartialEntity<TEntity>[]): Promise<[(TEntity | TEntity[]), number]>;

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient UPDATE query.
   * Does not check if entity exist in the database.
   * @param conditions
   * @param partialEntity
   */
  _update(conditions: FindConditions<TEntity>, partialEntity: QueryDeepPartialEntity<TEntity>): Promise<[(TEntity | TEntity[]), number]>;

  /**
   * Deletes entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient DELETE query.
   * Does not check if entity exist in the database.
   * @param conditions
   */
  _delete(conditions: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<TEntity>): Promise<number>;

  /**
   * Records the delete date of entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param conditions
   */
  _softDelete(conditions: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<TEntity>): Promise<number>;

  /**
   * Restores entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param conditions
   */
  _restore(conditions: string | string[] | number | number[] | Date | Date[] | ObjectID | ObjectID[] | FindConditions<TEntity>): Promise<[(TEntity | TEntity[]), number]>;

  /**
   * Clears all the data from the given table/collection (truncates/drops it).
   */
  _clear(): Promise<number>;

}
