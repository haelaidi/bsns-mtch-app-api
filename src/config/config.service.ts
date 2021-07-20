import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ApiConfig, DbConfig, EnvConfig } from './interfaces';
import {
  ApiEnvironmentEnum, DbCnxEnvironmentEnum,
  DbEnvironmentEnum,
  EnvironmentEnum,
  JwtEnvironmentEnum,
} from '../common/enums/Environment.enum';
import { hostname } from 'os';

@Injectable()
export class ConfigService {

  private readonly envConfig: EnvConfig;

  constructor() {
    dotenv.config();
    this.envConfig = require(`../environment/environment${this.isProduction() ? '.prod' : ''}`);
  }

  isProduction(): boolean {
    return (process.env.NODE_ENV === EnvironmentEnum.production);
  }

  get(key: string): any {
    return this.envConfig[key];
  }

  private getDbConfig(typeDbCnx: DbCnxEnvironmentEnum): DbConfig {
    return this.get('database')[typeDbCnx];
  }

  apiConfig(): ApiConfig {
    return {
      host: hostname(),
      port: this.get(ApiEnvironmentEnum.port),
      production: this.get(ApiEnvironmentEnum.production),
      username: this.get(ApiEnvironmentEnum.username_basicauth),
      password: this.get(ApiEnvironmentEnum.password_basicauth),
      jwt_secret_auth: this.get(ApiEnvironmentEnum.jwt_secret_auth),
      jwt_expire_in_auth: this.get(ApiEnvironmentEnum.jwt_expire_auth),
      jwt_secret_verify: this.get(ApiEnvironmentEnum.jwt_secret_verify),
      jwt_expire_in_verify: this.get(ApiEnvironmentEnum.jwt_expire_verify),
      logger_api: this.get(ApiEnvironmentEnum.logger_api),
      logger_database: this.get(ApiEnvironmentEnum.logger_database),
      file_location: this.get(ApiEnvironmentEnum.file_location),
      file_max_size: this.get(ApiEnvironmentEnum.file_max_size_mb),
    };
  }

  jwtOption(typeJwt: JwtEnvironmentEnum) {
    return {
      secret: this.get(typeJwt == JwtEnvironmentEnum.auth ? ApiEnvironmentEnum[typeJwt] : ApiEnvironmentEnum.jwt_secret_verify),
      signOptions: { expiresIn: typeJwt == JwtEnvironmentEnum.auth ? ApiEnvironmentEnum.jwt_expire_auth : ApiEnvironmentEnum.jwt_expire_verify },
    };
  }

  dbConfig(typeDbCnx: DbCnxEnvironmentEnum): any {
    const config: DbConfig = this.getDbConfig(typeDbCnx);
    return {
      name: config[DbEnvironmentEnum.name],
      host: config[DbEnvironmentEnum.host],
      type: config[DbEnvironmentEnum.dialect],
      port: config[DbEnvironmentEnum.port],
      schema: config[DbEnvironmentEnum.schema],
      database: config[DbEnvironmentEnum.database],
      username: config[DbEnvironmentEnum.username],
      password: config[DbEnvironmentEnum.password],
      entities: config[DbEnvironmentEnum.entities],
      logging: config[DbEnvironmentEnum.logging],
      synchronize: config[DbEnvironmentEnum.synchronise],
      requestTimeout: config[DbEnvironmentEnum.request_timeout],
      timezone: config[DbEnvironmentEnum.timezone],
      extra: config[DbEnvironmentEnum.extra],
    };
  }

}
