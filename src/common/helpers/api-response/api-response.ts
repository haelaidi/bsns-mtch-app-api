import { HttpStatus } from '@nestjs/common';
import { LoggerOptionEnum } from '../../enums/LoggerOption.enum';
import { LimitRowsEnum } from '../../enums/LimitRows.enum';
import { IApiResponse } from './api-response.interface';
import { transformAndValidateSync } from 'class-transformer-validator';
import { LoggerService } from '../../../logger/Logger.service';

export class ApiResponse extends LoggerService implements IApiResponse {

  statusCode: number | HttpStatus;
  message: string;
  data: any;
  error: any;
  pages: number;
  page: number;
  count: number;
  limit: number | LimitRowsEnum;

  constructor() {
    super(LoggerOptionEnum.API);
    this.limit = Number(LimitRowsEnum.limit_default);
  }

  private async _onSetResponse(statusCode: number | HttpStatus, message: string, data?: any, error?: any, count?: number): Promise<void> {
    const countLine = count ? count : data instanceof Array ? data.length : 0;
    this.statusCode = Number(statusCode ? statusCode : HttpStatus.OK);
    this.message = message ? message : 'Response successfully';
    this.data = data;
    this.pages = countLine <= 0 && this.limit <= 0 ? 0 : Math.ceil(countLine / this.limit);
    this.page = countLine <= 0 ? 0 : this.page;
    this.count = countLine;
  }

  async _onTransformAndValidate(classType: any, records: any): Promise<[any, string]> {
    let entity: any = null;
    let message: string = '';
    try {
      entity = await transformAndValidateSync(classType, records, {
        validator: { whitelist: true },
        transformer: { strategy: 'exposeAll' },
      });
    } catch (e) {
      if (e instanceof Array) {
        e.forEach(err => {
          message += '\n' + Object.keys(err.constraints).map(key => err.constraints[key]);
        });
      } else {
        message = e.message;
      }
    }
    return [entity, message];
  }

  async _onSuccess(
    data: any,
    count?: number,
    message?: any,
    statusCode?: number | HttpStatus,
  ): Promise<void> {
    await this._onSetResponse(
      Number(statusCode ? statusCode : HttpStatus.OK),
      message ? message : 'Response successfully',
      data,
      null,
      count,
    );
  }

  async _onError(
    message: string,
    err?: any,
    statusCode?: number | HttpStatus,
  ): Promise<void> {
    await this._onSetResponse(
      Number(statusCode ? statusCode : HttpStatus.INTERNAL_SERVER_ERROR),
      message ? message : 'Erreur inconu',
      null, err,
    );
  }

  _onParamsPagination(query: any) {
    this.page = Number(query.page || 1);
    this.limit = Number(query.limit || LimitRowsEnum.limit_default);
    const skippedRows = (this.page - 1) * this.limit;
    delete query['page'];
    delete query['limit'];
    const options: any = {
      skip: skippedRows,
      take: this.limit,
    };
    return options;
  }

  async send(
    res: any,
  ): Promise<any> {
    let wsResponse: any = {
      statusCode: this.statusCode,
      message: this.message,
    };

    if (this.data) {
      wsResponse.data = this.data;
      if (this.data instanceof Array) {
        wsResponse.pages = this.pages;
        wsResponse.page = this.page;
        wsResponse.limit = this.limit;
        wsResponse.count = this.count;
      }
    } else {
      wsResponse.error = this.error;
    }
    return res
      .status(this.statusCode)
      .json(wsResponse);
  }

}
