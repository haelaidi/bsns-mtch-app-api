import { ConfigService } from './config.service';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { ApiEnvironmentEnum } from '../common/enums/Environment.enum';

const configService: ConfigService = new ConfigService();

export const storage: any = (path?: string) => {
  return diskStorage({
    destination: (req: any, file: any, cb: any) => {
      const uploadPath = join(configService.get(ApiEnvironmentEnum.file_location), (path ? path : ''));
      console.log(uploadPath);
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, {recursive: true});
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  });
};
