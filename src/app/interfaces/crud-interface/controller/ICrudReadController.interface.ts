import { IApiResponse } from '../../../../common/helpers/api-response/api-response.interface';

/**
 * Interface controller of the simple method read of service#entity.
 */
export interface ICrudReadController {

  /**
   * Finds entities that match given options or conditions (requesy.query).
   * @param request
   * @param response
   */
  _find(request: any, response: any): Promise<IApiResponse>;

  /**
   * Finds entities deleted that match given options or conditions (request.query).
   * @param request
   * @param response
   */
  _findSoft(request: any, response: any): Promise<IApiResponse>;

  /**
   * Finds entities + deleted that match given options or conditions (request.query).
   * @param request
   * @param response
   */
  _findAndSoft(request: any, response: any): Promise<IApiResponse>;

  /**
   * Find entity by id and that matches given options (request.query).
   * @param request
   * @param response
   */
  _findById(request: any, response: any): Promise<IApiResponse>;

  /**
   * Finds first entity that matches given options or conditions (request.query).
   * @param request
   * @param response
   */
  _findOne(request: any, response: any): Promise<IApiResponse>;

}
