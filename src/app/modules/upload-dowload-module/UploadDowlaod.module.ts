import { Module } from '@nestjs/common';
import importToArray from 'import-to-array';
import { CoreModule } from '../Core.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../../../config/config.module';
import { ConfigService } from '../../../config/config.service';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { ApiEnvironmentEnum } from '../../../common/enums/Environment.enum';

@Module({
  imports: [
    CoreModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: (req: any, file: any, cb: any) => {
            const pathDefault = join(configService.get(ApiEnvironmentEnum.file_location));
            // Create folder if doesn't exist
            if (!existsSync(pathDefault)) {
              mkdirSync(pathDefault);
            }
            cb(null, pathDefault);
          },
          // file rename
          filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            return cb(null, `${randomName}${extname(file.originalname)}`);
          },
        }),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: importToArray(require('../../controllers/upload-dowload-controller')),
})
export class UploadDowlaodModule {
}
