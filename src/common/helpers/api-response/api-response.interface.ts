import { HttpStatus } from '@nestjs/common';

export interface IApiResponse {
  statusCode: number | HttpStatus;
  message: string;
  data?: any;
  error?: any;
}
