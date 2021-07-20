import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ICrudReadController } from '../../interfaces/crud-interface/controller/ICrudReadController.interface';
import { CrudReadWriteService } from '../../services/crud-service';
import { ClassType } from 'class-transformer-validator';
import { ApiResponse } from '../../../common/helpers/api-response/api-response';
import { IApiResponse } from '../../../common/helpers/api-response/api-response.interface';

@Controller()
export abstract class CrudReadWriteController<TEntity, T, C, U, D> extends ApiResponse implements ICrudReadController {


  protected constructor(private readonly _service: CrudReadWriteService<TEntity>,
                        private readonly _DtoEntity?: ClassType<T>,
                        private readonly _CreateDtoEntity?: ClassType<C>,
                        private readonly _UpdateDtoEntity?: ClassType<U>,
                        private readonly _DeleteDtoEntity?: ClassType<D>) {
    super();
  }

  /**
   * Finds entities that match given options or conditions (requesy.query).
   * @param request
   * @param response
   */
  @Get()
  async _find(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const paginations: any = this._onParamsPagination(query);
        const options: any = { where: entityDto, ...paginations };
        const [data, count] = await this._service._find(options);
        await this._onSuccess(data, count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Finds entities deleted that match given options or conditions (request.query).
   * @param request
   * @param response
   */
  @Get('soft')
  async _findSoft(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const paginations: any = this._onParamsPagination(query);
        const options: any = { where: entityDto, ...paginations };
        const [data, count] = await this._service._findSoft(options);
        await this._onSuccess(data, count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Finds entities + deleted that match given options or conditions (request.query).
   * @param request
   * @param response
   */
  @Get('all')
  async _findAndSoft(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const paginations: any = this._onParamsPagination(query);
        const options: any = { where: entityDto, ...paginations };
        const [data, count] = await this._service._findAndSoft(options);
        await this._onSuccess(data, count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Find entity by id and that matches given options (request.query).
   * @param request
   * @param response
   */
  @Get('id')
  async _findById(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { id } = request.query;
      const { query } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const paginations: any = this._onParamsPagination(query);
        const options: any = { where: entityDto, ...paginations };
        const data = await this._service._findById(id, options);
        await this._onSuccess(data, data ? 1 : 0);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Finds first entity that matches given options or conditions (request.query).
   * @param request
   * @param response
   */
  @Get('one')
  async _findOne(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const options: any = { where: entityDto };
        const data = await this._service._findOne(options);
        await this._onSuccess(data, data ? 1 : 0);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Saves all given entities in the database.
   * If entities do not exist in the database then inserts, otherwise updates.
   * @param request
   * @param response
   */
  @Post('upsert')
  async _upsert(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { user } = request;
      const { body } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, body);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        if (user && user.user) {
          if (entityDto['id'] > 0) {
            entityDto['updatedby'] = user.user.id;
          } else {
            entityDto['createdby'] = user.user.id;
            delete entityDto['id'];
          }
        }
        const [data, count] = await this._service._upsert(entityDto);
        await this._onSuccess(data, count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Inserts a given entity into the database.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient INSERT query.
   * Does not check if entity exist in the database, so query will fail if duplicate entity is being inserted.
   * @param request
   * @param response
   */
  @Post()
  //@UsePipes(new ValidationPipe({ transform: true }))
  async _insert(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { user } = request;
      const { body } = request;
      const [entityDto, message]: any = await this._onTransformAndValidate(this._DtoEntity, body);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        if (user && user.user) body['createdby'] = user.id;
        const [data, count] = await this._service._insert(entityDto);
        await this._onSuccess(data, count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Updates entity partially. Entity can be found by a given conditions.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient UPDATE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  @Put()
  async _update(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const { user } = request;
      const { body } = request;
      const [conditions, messageOption] = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!conditions) {
        await this._onError(messageOption, new Error(messageOption), HttpStatus.BAD_REQUEST);
        return await this.send(response);
      }
      const [entityDto, message] = await this._onTransformAndValidate(this._DtoEntity, body);
      if (!entityDto) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
        return await this.send(response);
      }
      if (user && user.user) body['updatedby'] = user.id;
      const [data, count] = await this._service._insert(entityDto);
      await this._onSuccess(data, count);
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Deletes entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient DELETE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  @Delete()
  async _delete(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [conditions, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!conditions) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const count = await this._service._delete(conditions);
        await this._onSuccess(count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Records the delete date of entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  @Delete('soft')
  async _softDelete(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [conditions, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!conditions) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const entityDto: any = { deletedat: new Date(), deletedby: conditions.deletedby };
        const count = await this._service._update(conditions, entityDto);
        await this._onSuccess(count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * Restores entities by a given criteria.
   * Unlike save method executes a primitive operation without cascades, relations and other operations included.
   * Executes fast and efficient SOFT-DELETE query.
   * Does not check if entity exist in the database.
   * @param request
   * @param response
   */
  @Put('restore')
  async _restore(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const { query } = request;
      const [conditions, message]: any = await this._onTransformAndValidate(this._DtoEntity, query);
      if (!conditions) {
        await this._onError(message, new Error(message), HttpStatus.BAD_REQUEST);
      } else {
        const options: any = { where: conditions };
        const [data, count] = await this._service._restore(options);
        await this._onSuccess(data, count);
      }
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }

  /**
   * clean all data of entity in the database
   * @param request
   * @param response
   */
  @Delete('clear')
  async _clear(@Req() request: any, @Res() response: any): Promise<IApiResponse> {
    try {
      const count = await this._service._clear();
      await this._onSuccess({ count: count });
    } catch (err) {
      await this._onError(err.message, err);
    }
    return await this.send(response);
  }
}
