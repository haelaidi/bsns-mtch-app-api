import {Global, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import importToArray from 'import-to-array';
import {MailModule} from './mail-module/Mail.module';
import {ConfigService} from "../../config/config.service";
import {ApiEnvironmentEnum, DbCnxEnvironmentEnum} from "../../common/enums/Environment.enum";
import {ConfigModule} from "../../config/config.module";
import {diskStorage} from "multer";
import {extname, join} from "path";
import {existsSync, mkdirSync} from "fs";

const services: any[] = [
    ...importToArray(require('../services/mail-service')),
    ...importToArray(require('../services/upload-dowload-service')),
    ...importToArray(require('../services/bsnsmtch-service')),
];

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => configService.dbConfig(DbCnxEnvironmentEnum.bsnsmtch),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(importToArray(require('../models/entities/bsnsmtch-entity')), 'default'),
        MailModule
    ],
    providers: services,
    exports: services,
})
export class CoreModule {
}
