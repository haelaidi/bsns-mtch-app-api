import { PlatformTools } from 'typeorm/platform/PlatformTools';
import * as moment from 'moment';

export class WriteFile {

  path: string;

  constructor(path: string) {
    this.path = path;
  }

  onWriteFile(strings: string | string[]): void {
    const path = ``;
    strings = Array.isArray(strings) ? strings : [strings];
  }

  protected write(strings: string | string[]): void {
    strings = Array.isArray(strings) ? strings : [strings];
    const basePath = __dirname + "/";
    const date = new Date();
    let logPath = `${date.getFullYear() + '_' + date.getMonth() + '_' + date.getDate() + ' ' + date.getHours() + '_' + date.getMinutes()}.log`;
    console.log(logPath);
    logPath = PlatformTools.pathNormalize(logPath);
    strings = (strings as string[]).map(str => "[" + new Date().toISOString() + "]" + str);
    PlatformTools.appendFileSync(basePath + logPath, strings.join("\r\n") + "\r\n"); // todo: use async or implement promises?
  }
}
