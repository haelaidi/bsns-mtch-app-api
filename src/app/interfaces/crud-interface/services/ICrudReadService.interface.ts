import { FindConditions, FindManyOptions, FindOneOptions, ObjectID } from 'typeorm';

/**
 * Interface service of the simple method read of respository#entity.
 */
export interface ICrudReadService<TEntity> {

  /**
   * Finds entities that match given options or conditions.
   * @param options
   */
  _find(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<[TEntity[], number]>;

  /**
   * Finds entities deleted that match given options or conditions.
   * @param options
   */
  _findSoft(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<[TEntity[], number]>;

  /**
   * Finds entities + deleted that match given options or conditions.
   * @param options
   */
  _findAndSoft(options?: FindManyOptions<TEntity> | FindConditions<TEntity>): Promise<[TEntity[], number]>;

  /**
   * Find entity by id and that matches given options.
   * @param ids
   * @param options
   */
  _findById(ids?: string | number | Date | ObjectID, options?: FindOneOptions<TEntity>): Promise<TEntity>;

  /**
   * Finds first entity that matches given options or conditions.
   * @param conditions
   * @param options
   */
  _findOne(conditions?: FindConditions<TEntity>, options?: FindOneOptions<TEntity>): Promise<TEntity>;

}
