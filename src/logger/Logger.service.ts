import { FileLogger } from 'typeorm';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import * as fs from 'fs';
import * as moment from 'moment';
import { LoggerOptionEnum } from '../common/enums/LoggerOption.enum';
import { LoggerExtensionEnum } from '../common/enums/LoggerExtension.enum';

export class LoggerService extends FileLogger {

  loggerOption: LoggerOptionEnum;
  loggerPath: string;
  loggerExtension: LoggerExtensionEnum;

  constructor(
    private option: LoggerOptionEnum,
  ) {

    super('all');

    this.loggerOption = option;
    this.loggerPath = '';
    this.loggerExtension = LoggerExtensionEnum.EXTENSION_DEFAULT;

    this.initLogger();
  }

  private initLogger() {

    this.loggerPath = 'loggers/';

    switch (this.loggerOption) {
      case LoggerOptionEnum.API:
        this.loggerPath += LoggerOptionEnum.API;
        this.loggerExtension = LoggerExtensionEnum.EXTENSION_DEFAULT;
        break;
      case LoggerOptionEnum.DB:
        this.loggerPath += LoggerOptionEnum.DB;
        this.loggerExtension = LoggerExtensionEnum.EXTENSION_DEFAULT;
        break;
      case LoggerOptionEnum.ZKM:
        this.loggerPath += LoggerOptionEnum.ZKM;
        this.loggerExtension = LoggerExtensionEnum.EXTENSION_TXT;
        break;
      default:
        this.loggerPath += LoggerOptionEnum.DEFAULT;
        this.loggerExtension = LoggerExtensionEnum.EXTENSION_DEFAULT;
        break;
    }

    if (!fs.existsSync(this.loggerPath)) fs.mkdirSync(this.loggerPath, { recursive: true });
  }

  async setLog(request: any): Promise<any> {
    let message = `${this.constructor.name} => [method: ${request.method}] [url: ${request.originalUrl}] [protocol: ${request.protocol}] [ip: ${request.ip}]`;
    if (request.params) message += ` [params: ${JSON.stringify(request.params)}]`;
    if (request.query) message += ` [query: ${JSON.stringify(request.query)}]`;
    if (request.body) message += ` [body: ${JSON.stringify(request.body)}]`;
    await this.log(message);
  }

  log(message: any, context?: string): any {
    this.write('[INFO]: ' + message);
  }

  debug(message: any, context?: string): any {
    this.write('[DEBUG]: ' + message);
  }

  error(message: any, trace?: string, context?: string): any {
    this.write([
      `[ERROR]: ${message}`,
      `[TRACE]: ${trace}`,
    ]);
  }

  verbose(message: any, context?: string): any {
    this.write('[VERBOSE]: ' + message);
  }

  warn(message: any, context?: string): any {
    this.write('[WARN]: ' + message);
  }

  protected write(strings: string | string[]) {
    const bConsole = (process.env.APP_LOGGER_CONSOLE == 'true' || process.env.APP_LOGGER_CONSOLE == '1');
    if (bConsole) {
      console.log(strings);
    } else {
      strings = Array.isArray(strings) ? strings : [strings];
      strings = (strings as string[]).map(str => '[' + moment().format('YYYY-MM-DD HH:mm:ss,SSS') + ']\t' + str);
      const basePath = `${this.loggerPath}/${this.loggerOption}_${moment().format('YYYY_MM_DD') + this.loggerExtension}`;
      PlatformTools.appendFileSync(basePath, strings.join('\r\n') + '\r\n');
    }
  }

}
