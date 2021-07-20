import { IApiResponse } from '../../../../common/helpers/api-response/api-response.interface';

/**
 * * Interface controller of the simple method write of service#entity.
 */
export interface ICrudWriteController {
  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   * @param request
   * @param response
   */
  _upsert(request: any, response: any): Promise<IApiResponse>;

  /**
   * Inserts a given entity into the database.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient INSERT query.
   * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
   * @param request
   * @param response
   */
  _insert(request: any, response: any): Promise<IApiResponse>;

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient UPDATE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  _update(request: any, response: any): Promise<IApiResponse>;

  /**
   * Deletes entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient DELETE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  _delete(request: any, response: any): Promise<IApiResponse>;

  /**
   * Records the delete date of entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  _softDelete(request: any, response: any): Promise<IApiResponse>;

  /**
   * Restores entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  _restore(request: any, response: any): Promise<IApiResponse>;

  /**
   * clean all data of entity in the database
   * @param request
   * @param response
   */
  _clear(request: any, response: any): Promise<IApiResponse>;

}
